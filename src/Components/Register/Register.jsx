import { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import "./Register.css";
import "../SignIn/SignIn.css";
import SignInForm from "../SignInForm/SignInForm";
import { API_URL, endpoints } from "../../constants/settings";
import { setToken } from "../../lib/contexts/Auth/utils";
import { AuthContext } from "../../lib/contexts/Auth/AuthContext";
import { ROUTES } from "../../constants/routes";

function Register({ callbackFunc }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const submit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await fetch(
        `${API_URL}${endpoints.users}${endpoints.signup}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName,
            password,
            confirmPassword,
            firstName,
            lastName,
          }),
        }
      );
      const jsonResponse = await response.json();
      if (response.status === 201) {
        const user = jsonResponse.data;
        console.log(user);
        setToken(user.token);
        delete user.token;
        setUser({...user, isLoggedIn: true});
        navigate(ROUTES.chat);
      } else if ([403, 409, 422].includes(response.status)) {
        setErrorMessage(jsonResponse.message);
      } else {
        setErrorMessage(
          "Something went wrong with logging in. Please try again."
        );
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(
        "Something went wrong with logging in. Please try again."
      );
    }
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
    );
  }, [firstName, lastName, userName, password, confirmPassword]);

  useEffect(() => {
    if (btnDisabled) {
      ready() && setBtnDisabled(false);
    } else {
      !ready() && setBtnDisabled(true);
    }
  }, [ready, btnDisabled]);

  return (
    <div className="sign-in-content">
      <div className="login-SMA">SMA - The newest Shared Messaging App!</div>
      <div className="login-subheader">
        Create a free account to send instant messages to your friends!
      </div>
      <SignInForm
        formDetails={formDetails}
        btnDisabled={btnDisabled}
        errorMessage={errorMessage}
      />
      <div className="account-message" onClick={callbackFunc}>
        Already have an account? Click here to login!
      </div>
    </div>
  );
}

export default Register;
