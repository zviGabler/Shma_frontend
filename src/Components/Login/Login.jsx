import { useCallback, useEffect, useState } from 'react';
import './Login.css';
import '../SignIn/SignIn.css';
import SignInForm from '../SignInForm/SignInForm';
import { API_URL, endpoints } from '../../constants/settings';

function Login({ callbackFunc }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const formFields = [
    {
      type: 'text',
      placeholder: 'User Name',
      onChange: (e) => setUserName(e.target.value),
      value: userName,
      id: 1,
    },
    {
      type: 'password',
      placeholder: 'Password',
      onChange: (e) => setPassword(e.target.value),
      value: password,
      id: 2,
    },
  ];

  const submit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const response = await fetch(
        `${API_URL}${endpoints.users}${endpoints.login}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName,
            password,
          }),
        }
      );
      const jsonResponse = await response.json();
      if (response.status === 200) {
        const user = jsonResponse.data;
        console.log(user);
        //jwt auth here and redirect from login page
      } else if ([403, 422].includes(response.status)) {
        setErrorMessage(jsonResponse.message);
      } else {
        setErrorMessage(
          'Something went wrong with logging in. Please try again.'
        );
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(
        'Something went wrong with logging in. Please try again.'
      );
    }
  };

  const formDetails = { formFields, submit, btn: 'Login' };

  const ready = useCallback(() => {
    return userName.length && password.length;
  }, [userName, password]);

  useEffect(() => {
    if (btnDisabled) {
      ready() && setBtnDisabled(false);
    } else {
      !ready() && setBtnDisabled(true);
    }
  }, [ready, btnDisabled]);

  return (
    <div className='sign-in-content'>
      <div className='login-SMA'>SMA - The newest Shared Messaging App!</div>
      <div className='login-subheader'>
        Login here to access your messages and connect with your friends by
        sending them messages!
      </div>
      <SignInForm
        formDetails={formDetails}
        btnDisabled={btnDisabled}
        errorMessage={errorMessage}
      />
      <div className='account-message' onClick={callbackFunc}>
        Don't have an account yet? Click here to create a free account!
      </div>
    </div>
  );
}

export default Login;
