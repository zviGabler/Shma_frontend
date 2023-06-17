import React, { useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import Logout from './Logout';
import Robot from '../../assets/robot.gif';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../../lib/contexts/Auth/AuthContext';
import { WsContext } from '../../lib/contexts/Ws/WsContext';
import FriendRequests from './FriendRequests';

export default function ChatContainer({ currentChat, socket, selectedTab, messages, setMessages}) {
  
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const { user } = useContext(AuthContext);
  const { setChatsHistory, chatsHistory } = useContext(WsContext);

  const handleSendMsg = async (message) => {
    
    socket.emit('chat_message', {
      to: currentChat.id,
      from: user.id,
      type: selectedTab === 'friends' ? 'private' : 'group',
      message,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message });
    setMessages(msgs);

    setChatsHistory((prev) => {
      const history = { ...prev };

      let chat = currentChat.id;
      const type = selectedTab === 'friends' ? 'private' : 'group';

      if (!history[type][chat]) {
        history[type][chat] = [];
      }
      history[type][chat].push({
        fromSelf: true,
        message,
        type,
        ...(type === 'group' && { from: currentChat.id })
      });

      return history;
    });
  };
  
  return (
    <Container>
      <div className='chat-header'>
        <div className='user-details'>
          <div className='avatar'>
            <img src={Robot} alt='' />
          </div>
          <div className='username'>
            <h3>{currentChat.username || currentChat.name}</h3>
          </div>
        </div>
        <dib className="buttons">
          <FriendRequests />
          <Logout />
        </dib>
      </div>
      <div className='chat-messages'>
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? 'sended' : 'recieved'
                }`}
              >
                <div className='content '>
                  <p>{message.message}</p>
                  <span className='display-user'>{ !message.fromSelf ? (currentChat.username || message.userName )  
                  : user.userName}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  gap: 0.1rem;
  height: 90vh;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 65% 20%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .buttons {
      display: flex;
      gap: 1rem;
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 0.5rem ;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #31a377;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #722994;
      }
    }
    .display-user {
      position: relative;
      top: -5rem;
      color: pink;
    }
  }
`;
