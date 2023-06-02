import { createContext } from "react";

export const WsContext = createContext({});

const Provider = WsContext.Provider;

export const WsProvider = ({children}) => {

  return (
    <Provider value={{}}>
      {children}
    </Provider>
  )
}