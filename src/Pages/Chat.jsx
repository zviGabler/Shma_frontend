import React, { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import styled from 'styled-components';
import ChatContainer from '../Components/ChatComponents/ChatContainer';
import Contacts from '../Components/ChatComponents/Contacts';
import Welcome from '../Components/ChatComponents/Welcome';
import Groups from '../Components/ChatComponents/Groups';
import { WsContext } from '../lib/contexts/Ws/WsContext';
import { AuthContext } from '../lib/contexts/Auth/AuthContext';

export default function Chat() {
  // const [selectFriends, setSelectFriends] = useState(true);
  // const [selectGroups, setSelectGroups] = useState(false);
  const {user} = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState('friends');
  const navigate = useNavigate();
  const { socket, chatsHistory } = useContext(WsContext);
  const [contacts, setContacts] = useState([]);

    
  const [groups, setGroups] = useState([]);
 
  const [currentChat, setCurrentChat] = useState({});
  
  const [messages, setMessages] = useState([]);
  

  const handleSelectFriends = () => {
    if (selectedTab !== 'friends') setSelectedTab('friends');
  };

  const handleSelectGroups = () => {
    if (selectedTab !== 'groups') setSelectedTab('groups');
  };

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  
  useEffect(() => {
    const userGroups = [];
     if (Array.isArray(chatsHistory.userGroups) ) {
      for (let i = 0; i < chatsHistory.userGroups.length; i++) {
        userGroups.push({id:chatsHistory.userGroups[i].id, name: chatsHistory.userGroups[i].name});
      } 
        setGroups(userGroups);
    }
    
  
  }, [user.isLoggedIn]);
  useEffect(() => {
    const userContacts = [];
    if (Array.isArray(chatsHistory.friends)  && chatsHistory.friends.length > 0) {
      for (let i = 0; i < chatsHistory.friends.length; i++) {
        userContacts.push({id:chatsHistory.friends[i].id, username: chatsHistory.friends[i].userName});
      } 
        setContacts(userContacts);
    }
  }, [user.isLoggedIn]);
   
  return (
    <>
      <Container>
        <div className='container'>
          <div className='friends-groups'>
            <div className='friends-header'>
              <button className='btn' onClick={handleSelectFriends}>
                Friends
              </button>
              <button className='btn' onClick={handleSelectGroups}>
                Groups
              </button>
            </div>

            {selectedTab === 'friends' ? (
              <Contacts contacts={contacts} 
              changeChat={handleChatChange}
              setMessages={setMessages} 
              chatsHistory={chatsHistory} 
              />
            ) : (
              <Groups groups={groups} 
              changeChat={handleChatChange} 
              setMessages={setMessages}  
              chatsHistory={chatsHistory}
              />
            )}
          </div>

          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer
              currentChat={currentChat}
              socket={socket}
              selectedTab={selectedTab}
              messages={messages}
              setMessages={setMessages}
            />
          )}
        </div>
      </Container>
    </>
  );
}


const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  align-items: center;
  background-color: #431324;
  overflow: scroll;
  .container {
    height: 90vh;
    width: 90vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }

  .friends-groups {
    grid-column-start: 0;
    grid-column-end: 2;
    height: 95%;
  }

  .friends-header {
    display: flex;
    justify-content: space-around;
    height: 5%;
  }

  .btn {
    background-color: #431324;
    color: #4ff;
    border: none;
  }
`;

