import { createContext } from "react";
import useAuth from "../hooks/useAuth";

export const AuthContext = createContext({});

const Provider = AuthContext.Provider;

export const AuthProvider = ({children}) => {
  const auth = useAuth()

  return (
    <Provider value={{...auth}}>
      {children}
    </Provider>
  )
}

