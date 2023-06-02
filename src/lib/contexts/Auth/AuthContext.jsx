import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { getToken, isTokenExpired } from "./utils";
import Api from "../../api";
import { API_URL, TOKEN_NAME } from "../../../constants/settings";

export const AuthContext = createContext({});

const Provider = AuthContext.Provider;

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
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
    localStorage.removeItem(TOKEN_NAME)
    setUser({isLoggedIn: false})
  }  

  useEffect(() => {
    // some auth logic here on mount

    // for now, just set user to the first user in the db
    const initAuth = async () => {
      const reponse = await api.getUserById(1);
      setUser({...reponse.data.data, isLoggedIn: true})
    }
    initAuth()

    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor);
      axiosInstance.interceptors.request.eject(requestInterceptor);
  };
  }, [requestInterceptor, responseInterceptor]);

  const auth = {
    user,
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

