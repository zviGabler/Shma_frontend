import { useState } from 'react';
import './SignIn.css';
import Register from '../Register/Register';
import Login from '../Login/Login';

function SignIn() {

    const [isShowLogin, setIsShowLogin] = useState(true);

  return (
    <div className="SignIn">
      <div className='header'>
        Welcome to Shma!
      </div>
      <div className='subheader'>
        Sign in, or create a create a free account, to have access to the newest direct messaging app around!
      </div>
        {isShowLogin && <Login callbackFunc={() => setIsShowLogin(!isShowLogin)}  className="sign-in-content"/>}
        {!isShowLogin && <Register callbackFunc={() => setIsShowLogin(!isShowLogin)} className="sign-in-content" />}
    </div>
  );
}

export default SignIn;
