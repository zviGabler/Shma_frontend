import React, { useContext } from 'react'
import styled from 'styled-components';
import { AuthContext } from '../../lib/contexts/Auth/AuthContext';
import { WsContext } from '../../lib/contexts/Ws/WsContext';

export default function FriendRequestModal(props) {
  const {setIsModalOpened, pendingRequests } = props;
  const { user } = useContext(AuthContext);
  const { socket } = useContext(WsContext);

  const onClickAccept = (id) => {
    try {
      socket.emit('change_friend_request_status', {id, status: 'accepted'});
    } catch (error) {
      console.log(error);
    }
  }

  const onClickDecline = (id) => {
    try {
      socket.emit('change_friend_request_status', {id, status: 'declined'});
    } catch (error) {
      console.log(error);
    }
  }

  const onClickCancel = (id) => {
    try {
      socket.emit('change_friend_request_status', {id, status: 'canceled'});
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container onClick={() => setIsModalOpened(false)}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <h3 className='title'>Friends Requests</h3>
        <div className='requests'>
          {pendingRequests.map((request, index) => {
            return (
              <FriendRequest key={index}>
                <h3 className='username'>{request.userName}</h3>
                <div className='buttons'>
                  {request.fromId !== user.id ? <>
                    <button onClick={() => onClickAccept(request.id)}>Accept</button>
                    <button onClick={() => onClickDecline(request.id)}>Decline</button>
                  </> :
                    <button onClick={() => onClickCancel(request.id)
                    }>Cancel request</button>
                  }
                </div>
              </FriendRequest>
            )
          })}
        </div>
        {pendingRequests.length === 0 && <h3 className='title'>No pending requests</h3>}
      </Modal>
    </Container>
  )
}

const FriendRequest = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #3A374E;
  border-radius: 0.4rem;
  width: 100%;
  padding: 0 0.5rem;
  .username {
    color: #ffffff;
    font-size: 1.17rem;
    font-weight: 400;
  }
  .buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
  }
  .buttons button {
    padding: 0.2rem 0.5rem;
    border-radius: 0.2rem;
    border: none;
    background-color: #9a86f3;
    color: #ffffff;
    cursor: pointer;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 1rem;
  padding: 1rem;
  background-color: #9a86f3;
  border-radius: 0.5rem;
  width: 30rem;
  height: 18rem;
  overflow-y: auto;
  box-shadow: 0 0 0.5rem #000000;
  .title {
    font-size: 1.17rem;
    font-weight: bold;
    align-self: center;
  }
  .requests {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 1rem;
    margin: 0 auto;
    width: 85%;
  }
`
