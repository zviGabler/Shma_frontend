import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { FaUserFriends } from 'react-icons/fa';
import { WsContext } from '../../lib/contexts/Ws/WsContext';
import FriendRequestModal from './FriendRequestModal';

export default function FriendRequests() {
  const [isModalOpened, setIsModalOpened] = useState(true);
  const { chatsHistory, isChatHistoryLoaded } = useContext(WsContext);
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    if (isChatHistoryLoaded) {
      setPendingRequests(chatsHistory.friends.filter((friend) => friend.status === 'pending'));
    }
  }, [isChatHistoryLoaded, chatsHistory.friends]);

  return (
    <>
    {isChatHistoryLoaded && <>
      <Button onClick={() => setIsModalOpened(true)}>
        {pendingRequests.length > 0 && <Circle>{pendingRequests.length}</Circle>}
        <FaUserFriends />
      </Button>
      {isModalOpened && <FriendRequestModal {...{setIsModalOpened, pendingRequests, setPendingRequests}} />}
    </>}
    </>
  )
}

const Button = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;

const Circle = styled.span`
  position: absolute;
  top: -0.3rem;
  right: -0.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: red;
  color: white;
  font-size: 0.8rem;
`;
