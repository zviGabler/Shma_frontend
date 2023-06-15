import React, { useContext } from 'react';
import { BiPowerOff } from 'react-icons/bi';
import styled from 'styled-components';
import { AuthContext } from '../../lib/contexts/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export default function Logout() {
  const {logout} = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Button onClick={() => {
      logout();
      navigate(ROUTES.login)
      }}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
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
