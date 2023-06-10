import { createContext, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { BASE_BACKEND_URL } from "../../../constants/settings";
import { getToken } from "../Auth/utils";

export const WsContext = createContext({});

const Provider = WsContext.Provider;

export const WsProvider = ({children}) => {
  const auth = useContext(AuthContext);
  const { user } = auth;
  const socketRef = useRef(io(BASE_BACKEND_URL, {
    autoConnect: false,
  }));
  const [isConnected, setIsConnected] = useState(false);
  const connectionId = uuidv4();
  
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

    const onError = (error) => {
      console.log('socket_error', error)
    }

    const onConnectError = (error) => {
      console.log('connect_error', error)
    }

    const onChatMessage = (message) => {
      console.log('message', message)
    }

    const onLoadChatHistory = (history) => {
      console.log('history', history)
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('chat_message', onChatMessage);
    socket.on('error', onError);
    socket.on('connect_error', onConnectError);
    socket.on('load_chat_history', onLoadChatHistory);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('chat_message', onChatMessage);
      socket.off('error', onError);
      socket.off('connect_error', onConnectError);
      socket.off('load_chat_history', onLoadChatHistory);
    };
  }, []);    

  useEffect(() => {
    const socket = socketRef.current;

    if (user.isLoggedIn) {
      socket.auth = { userId: user.id, token: getToken(), connectionId };
      socket.connect();
      socket.emit('load_chat_history');
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