import React from 'react'
import styled from 'styled-components';

export default function FriendRequestModal(props) {
  const {setIsModalOpened, pendingRequests, setPendingRequests} = props;

  return (
    <Container onClick={() => setIsModalOpened(false)}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <h3 className='title'>Friend Request</h3>
        <div className='requests'>
          {pendingRequests.map((request, index) => {
            return (
              <Request key={index}>
                <h3 className='username'>{request.userName}</h3>
                <div className='buttons'>
                  <button onClick={() => {
                    setPendingRequests(pendingRequests.filter((r) => r.id !== request.id));
                  }}>Accept</button>
                  <button onClick={() => {
                    setPendingRequests(pendingRequests.filter((r) => r.id !== request.id));
                  }}>Decline</button>
                </div>
              </Request>
            )
          })}
        </div>
        {pendingRequests.length === 0 && <h3 className='title'>No pending requests</h3>}
      </Modal>
    </Container>
  )
}

const Request = styled.div`
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
  height: 15rem;
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
    align-items: start;
    gap: 1rem;
    width: 85%;
  }
`
