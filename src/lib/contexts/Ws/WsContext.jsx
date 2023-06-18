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
  const { user, api } = auth;
  const socketRef = useRef(io(BASE_BACKEND_URL, {
    autoConnect: false,
  }));
  const [isConnected, setIsConnected] = useState(false);
  const connectionId = uuidv4();
  
  const [chatsHistory, setChatsHistory] = useState({
    private: {}, group: {}
  });
  const [isChatHistoryLoaded, setIsChatHistoryLoaded] = useState(false);

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
      const { type, message: text, from, to, createdAt } = message;
      setChatsHistory((prev) => {
        const history = {...prev};

        let chat;
        if (type === 'private') {
          chat = from === user.id ? to : from;
        } else if (type === 'group') {
          chat = to;
        }
        if (!history[type][chat]) {
          history[type][chat] = [];
        }
        history[type][chat].push({
          fromSelf: from === user.id,
          message: text,
          type,
          ...(type === 'group' && { from }),
          createdAt
        });

        return history;
      });
    }

    const onChangeFriendRequestStatus = (data) => {
      const { from, to, status } = data;
      const id = from === user.id ? to : from;
      
      setChatsHistory((prev) => {
        const history = {...prev};
        if (status === 'accepted') {
          history.friends = prev.friends.map(friend =>
            friend.id === id ? {...friend, status: 'accepted'} : friend);
        } else {
          history.friends = prev.friends.filter(friend => friend.id !== id);
        }
        return history;
      });
    };

    const onSendFriendRequest = (data) => {
      const { toUser, fromUser, fromId } = data;
      const friend = fromUser.id === user.id ? toUser : fromUser
      setChatsHistory((prev) => {
        const history = {...prev};
        history.friends.push({
          ...friend,
          status: 'pending',
          fromId
        });
        return history;
      })
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('chat_message', onChatMessage);
    socket.on('change_friend_request_status', onChangeFriendRequestStatus)
    socket.on('send_friend_request', onSendFriendRequest);
    socket.on('error', onError);
    socket.on('connect_error', onConnectError);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('chat_message', onChatMessage);
      socket.off('change_friend_request_status', onChangeFriendRequestStatus)
      socket.off('send_friend_request', onSendFriendRequest);
      socket.off('error', onError);
      socket.off('connect_error', onConnectError);
    };
  }, [user]);    

  useEffect(() => {
    const socket = socketRef.current;

    if (user.isLoggedIn) {
      socket.disconnect();
      setIsChatHistoryLoaded(false);
      socket.auth = { userId: user.id, token: getToken(), connectionId };
      socket.connect();
    } else {
      setChatsHistory({
        private: {}, group: {}
      });
      setIsChatHistoryLoaded(false);
      socket.disconnect();
    }
  }, [user]);

  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const response = await api.getUserChatHistory();
        setChatsHistory(response.data.data);
        setIsChatHistoryLoaded(true);
      } catch (error) {
        console.log('error getting chat history', error)
      }
    }
    if (user.isLoggedIn) loadChatHistory();
  }, [user.id]);

  return (
    <Provider value={{
      socket: socketRef.current,
      isConnected,
      chatsHistory, 
      setChatsHistory,
      isChatHistoryLoaded
      }}>
      {children}
    </Provider>
  )
}