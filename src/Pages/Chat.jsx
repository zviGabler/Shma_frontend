import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import styled from 'styled-components';
import ChatContainer from '../Components/ChatComponents/ChatContainer';
import Contacts from '../Components/ChatComponents/Contacts';
import Welcome from '../Components/ChatComponents/Welcome';
import Groups from '../Components/ChatComponents/Groups';

export default function Chat() {
  const [selectFriends, setSelectFriends] = useState(true);
  const [selectGroups, setSelectGroups] = useState(false);
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([
    { id: 1, username: 'testing1' },
    { id: 2, username: 'testing2' },
    { id: 3, username: 'testing3' },
    { id: 4, username: 'testing4' },
    { id: 5, username: 'testing5' },
    { id: 6, username: 'testing6' },
  ]);
  const [groups, setGroups] = useState([
    { id: 1, username: 'group1' },
    { id: 2, username: 'group2' },
  ]);
  // const [currentChat, setCurrentChat] = useState(undefined);
  const [currentChat, setCurrentChat] = useState({
    username: 'testing3',
    avatarImage: 'https://i.imgur.com/6VBx3io.png',
    id: 1,
  });
  // const [currentUser, setCurrentUser] = useState(undefined);
  const [currentUser, setCurrentUser] = useState({
    username: 'testing2',
    id: 2,
  });

  const handleSelectFriends = () => {
    setSelectFriends(true);
    setSelectGroups(false);
  };

  const handleSelectGroups = () => {
    setSelectFriends(false);
    setSelectGroups(true);
  };

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  console.log('contacts', contacts);
  console.log('currentChat', currentChat);
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

            {selectFriends ? (
              <Contacts contacts={contacts} changeChat={handleChatChange} />
            ) : (
              <Groups groups={groups} changeChat={handleChatChange} />
            )}
          </div>

          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer
              currentChat={currentChat}
              // socket={socket}
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
  }

  .friends-header {
    display: flex;
    justify-content: space-around;
    padding: 0.5rem 0;
  }

  .btn {
    background-color: #431324;
    color: #4ff;
    border: none;
  }
`;
