import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { getToken, isTokenExpired, parseJwt } from "./utils";
import Api from "../../api";
import { API_URL, TOKEN_NAME } from "../../../constants/settings";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

const Provider = AuthContext.Provider;

export const AuthProvider = ({children}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({isLoggedIn: false});
  const [isLoading, setIsLoading] = useState(true);
  
  const axiosInstance = axios.create({
        baseURL: API_URL,
  });

  const requestInterceptor = axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken()
        if (token) {
            if (isTokenExpired(token) && user.isLoggedIn) {
                logout()
                navigate('/login')
            }
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
  )

  const responseInterceptor = axiosInstance.interceptors.response.use(
      response => {
          return response;
      },
      error => {
        if (error.response.status === 401 && user.isLoggedIn) {
            logout();
            navigate('/login')
        }
        return Promise.reject(error);
      }
  );

  const api = new Api(axiosInstance)

  const logout = async () => {
    console.log('logout')
    localStorage.removeItem(TOKEN_NAME)
    setUser({isLoggedIn: false})
  }  

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true)
      const token = getToken()
      if (!token) {
        setIsLoading(false)
        return
      }
    
      if (isTokenExpired(token)) {
        logout()
        navigate('/login')
        setIsLoading(false)
        return
      }
      
      try {
        const tokenPayload = parseJwt(token)
        const response = await api.getUserById(tokenPayload.id)
        const user = response.data.data
        console.log('user', user)
        setUser({...user, isLoggedIn: true})
      } catch (error) {
        console.log('Error while getting user info', error)
      } finally {
        setIsLoading(false)
      }
    }
    initAuth()

    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor);
      axiosInstance.interceptors.request.eject(requestInterceptor);
  };
  }, [requestInterceptor, responseInterceptor]);

  useEffect(() => {
    if (!user.isLoggedIn) {
      navigate('/login')
    }
  }, [user, navigate])

  const auth = {
    user,
    setUser,
    logout,
    api,
    isLoading
  }

  return (
    <Provider value={auth}>
      {children}
    </Provider>
  )
}

