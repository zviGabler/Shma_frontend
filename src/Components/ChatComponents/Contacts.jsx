import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo from '../../assets/logo.svg';
import StarLogo from '../../assets/davidstar.png';

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState('Jowwy'); //useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(Logo);
  const [currentSelected, setCurrentSelected] = useState(contacts[1]); // useState(undefined);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  console.log('contacts', contacts);
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className='brand'>
            <img
              src={StarLogo}
              // src=''
              alt='logo'
            />
            <h3>Welcome to Shma</h3>
          </div>
          <div className='contacts'>
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact.id}
                  className={`contact ${
                    index === currentSelected ? 'selected' : ''
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className='avatar'>
                    <img src={Logo} alt='' />
                  </div>
                  <div className='username'>
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='current-user'>
            <div className='avatar'>
              <img src={StarLogo} alt='avatar' />
            </div>
            <div className='username'>
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  overflow: hidden;
  height: 85vh;
  background-color: #080420;
  justify-self: stretch;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;

    margin: 1rem 0;
    margin-bottom: 1rem;
    justify-content: center;

    ${'' /* justify-content: start; */}
    img {
      ${'' /* height: 1.5rem; */}
      height: 1.5rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: stretch;
    overflow: auto;
    ${'' /* margin: auto */}
    ${'' /* gap: 1rem; */}
    gap: 0.8rem;
    ${
      '' /* margin-top: 1rem;
    margin-bottom: auto; */
    }
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 3rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.2rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 2rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 2rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 0.5rem;
        }
      }
    }
  }
`;
