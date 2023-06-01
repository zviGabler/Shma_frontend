import { useState, useEffect, useCallback } from "react";
import "./Register.css";
import "../SignIn/SignIn.css";
import SignInForm from "../SignInForm/SignInForm";

function Register({ callbackFunc }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);

  const formFields = [
    {
      type: "text",
      placeholder: "First Name",
      onChange: (e) => setFirstName(e.target.value),
      value: firstName,
      id: 1,
    },
    {
      type: "text",
      placeholder: "Last Name",
      onChange: (e) => setLastName(e.target.value),
      value: lastName,
      id: 2,
    },
    {
      type: "text",
      placeholder: "User Name",
      onChange: (e) => setUserName(e.target.value),
      value: userName,
      id: 3,
    },
    {
      type: "password",
      placeholder: "Password",
      onChange: (e) => setPassword(e.target.value),
      value: password,
      id: 4,
    },
    {
      type: "password",
      placeholder: "Confirm Password",
      onChange: (e) => setConfirmPassword(e.target.value),
      value: confirmPassword,
      id: 5,
    },
  ];

  const submit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  const formDetails = {
    formFields,
    submit,
    btn: "Sign Up!",
  };

  const ready = useCallback(() => {
    return (
        firstName.length &&
        lastName.length &&
        userName.length &&
        password.length &&
        confirmPassword.length
    )
  }, [firstName, lastName, userName, password, confirmPassword]);

  useEffect(() => {
    if (btnDisabled) {
        ready() && setBtnDisabled(false)
    } else {
        !ready() && setBtnDisabled(true)
    }
  }, [ready, btnDisabled])

  return (
    <div className="sign-in-content">
    <div className="login-SMA">SMA - The newest Shared Messaging App!</div>
    <div className="login-subheader">
      Create a free account to send instant messages to your friends!
    </div>
      <SignInForm formDetails={formDetails} btnDisabled={btnDisabled} />
      <div className="account-message" onClick={callbackFunc}>
        Already have an account? Click here to login!
      </div>
    </div>
  );
}

export default Register;
