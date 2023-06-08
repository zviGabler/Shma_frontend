import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { getToken, isTokenExpired, parseJwt } from "./utils";
import Api from "../../api";
import { API_URL, TOKEN_NAME } from "../../../constants/settings";

export const AuthContext = createContext({});

const Provider = AuthContext.Provider;

export const AuthProvider = ({children}) => {
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
        }
        return Promise.reject(error);
      }
  );

  const api = new Api(axiosInstance)

  // some auth logic here  
  // const login...
  // const signup...

  const logout = async () => {
    console.log('logout')
    localStorage.removeItem(TOKEN_NAME)
    setUser({isLoggedIn: false})
  }  

  useEffect(() => {
    // some auth logic here on mount

    // for now, just set user to the first user in the db
    const initAuth = async () => {
      setIsLoading(true)
      const token = getToken()
      if (!token) {
        setIsLoading(false)
        return
      }
    
      if (isTokenExpired(token)) {
        logout()
        setIsLoading(false)
        return
      }
      
      try {
        const tokenPayload = parseJwt(token)
        console.log('token', token)
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

  const auth = {
    user,
    setUser,
    // signup,
    // login,
    // logout,
    api,
    isLoading
  }

  return (
    <Provider value={auth}>
      {children}
    </Provider>
  )
}

