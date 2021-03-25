import React, { useState } from 'react';
import "./styles/LogIn.css";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import GoggleButton from '../SignUp/GoggleButton';
import InputField from '../SignUp/InputField';
import CatchLogInError from './logic/CatchLogInError';
import handleGoogleAuth from '../SignUp/logic/handleGoogleAuth';
import LoginRedirect from './LoginRedirect';

function LogIn() {

  // Determine if user is logged in
  const [user] = useAuthState(auth);

  // Display message to user to verify their email if it is not verified already
  const [unverifiedEmail, setUnverifiedEmail] = useState(false);

  // Use this variable to prevent LoginRedirect component from displaying
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Display a message if the login failed (e.g. wrong password)
  const [loginFailed, setLogInFailed] = useState(false);

  const [inputError, setInputError] = useState({
    emailError: false, 
    passwordError: false,
  });

  const [value, setValue] = useState({
    email: "", 
    password: "",
  });

  const handleInputChange = (valueProp) => {
    const handler = (e) => {
      // Copy value object state, update "key":"value" pair via dataID attribute
      const newValue = { ...value };
      newValue[valueProp] = e.target.value;
      setValue(newValue);

      // Copy error object state
      const newError = {...inputError};
      const errorProp = `${valueProp}Error`;

      // Determine if there is an error in the input value
      if (newValue[valueProp].length >= 1) {
        newError[errorProp] = false;
      } else {
        newError[errorProp] = true;
      }

      setInputError(newError);
    };
    return handler;
  };

  const handleLogIn = async (e) => {
    e.preventDefault();

    try {
      // Log in with email
      const userCredential = await auth.signInWithEmailAndPassword(value.email, value.password);

      // Sign out the user if the email is not verified
      if (!userCredential.user.emailVerified) {
        await auth.signOut();
        return setUnverifiedEmail(true);
      }
      // Prevent LoginRedirect component from displaying & auto route to homepage
      setLoginSuccess(true);
      window.location = "/";

    } catch (error) {
      CatchLogInError(error, value, setInputError, setLogInFailed);
    }
  };

  const handleGoogleLogIn = (e) => {
    handleGoogleAuth(e);
    setLoginSuccess(true);
  };

  // Route user to homepage if already logged in
  if (user && !loginSuccess) return <LoginRedirect />;

  // Default return if user isn't logged in
  return (
    <div className="log-in">
      <form className="log-in-form" onSubmit={handleLogIn}>
        <h2>Log in to your account</h2>
        <InputField
          error={inputError}
          classInput="email"
          inputType="email"
          placeholderText="Email"
          errorMessage="Email is not valid."
          valueProp="email"
          handleInputChange={handleInputChange}
        />
        <InputField 
          error={inputError}
          classInput="password"
          inputType="password"
          placeholderText="Password"
          errorMessage="Invalid password."
          valueProp="password"
          handleInputChange={handleInputChange}
        />
        { (unverifiedEmail) ? <span className="invalid-email">You must validate your email to log in. Check your email or junk mail to verify your account.</span> : <></> }
        { (loginFailed) ? <span className="login-failed-message">Login failed. Please check your email and password.</span> : <></> }
        <button className="log-in-button-form">Log in</button>
        <p>Or</p>
        <GoggleButton handleClick={handleGoogleLogIn} />
        <br/>
      </form>
    </div>
  );
}

export default LogIn;