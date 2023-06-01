import axios from "axios";

import { useEffect, useState } from "react";
import { TOKEN_NAME, API_URL } from "../../constants/settings";
import Api from "../api";


const parseJwt = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

const isTokenExpired = (token) => {
  const tokenPayload = parseJwt(token);
  const expiryDate = new Date(tokenPayload.exp * 1000);
  const now = new Date();
  return now.getTime() > expiryDate.getTime();
};

const getToken = () => localStorage.getItem(TOKEN_NAME);

export default function useAuth() {
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

    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor);
      axiosInstance.interceptors.request.eject(requestInterceptor);
  };
  }, []);

  return {
    user,
    // signup,
    // login,
    // logout,
    api,
    isLoading
  };
}
