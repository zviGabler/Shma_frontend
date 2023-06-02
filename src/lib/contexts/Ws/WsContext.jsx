import { createContext, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { io } from 'socket.io-client';
import { BASE_BACKEND_URL } from "../../../constants/settings";

export const WsContext = createContext({});

const Provider = WsContext.Provider;

export const WsProvider = ({children}) => {
  const auth = useContext(AuthContext);
  const { user } = auth;
  const socketRef = useRef(io(BASE_BACKEND_URL, {
    autoConnect: false,
  }));
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    const socket = socketRef.current;

    const onConnect = () => {
      setIsConnected(true);
      console.log('connected')
    }

    const onDisconnect = () => {
      setIsConnected(false);
      console.log('disconnected')
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);    

  useEffect(() => {
    const socket = socketRef.current;

    if (user.isLoggedIn) {
      socket.auth = { userId: user.id };
      socket.connect();
    } else {
      socket.disconnect();
    }
  }, [user.isLoggedIn, user.id]);

  return (
    <Provider value={{
      socket: socketRef.current,
      isConnected
      }}>
      {children}
    </Provider>
  )
}