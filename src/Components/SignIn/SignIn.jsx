import { useState } from 'react';
import './SignIn.css';
import Register from '../Register/Register';
import Login from '../Login/Login';

function SignIn() {

    const [isShowLogin, setIsShowLogin] = useState(true);

  return (
    <div className="SignIn">
        {isShowLogin && <Login callbackFunc={() => setIsShowLogin(!isShowLogin)}/>}
        {!isShowLogin && <Register callbackFunc={() => setIsShowLogin(!isShowLogin)}/>}
    </div>
  );
}

export default SignIn;
