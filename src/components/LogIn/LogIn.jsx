import React, { useEffect, useState } from 'react';
import "./styles/LogIn.css";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import GoggleButton from '../SignUp/GoggleButton';
import InputField from '../SignUp/InputField';
import CatchLogInError from './CatchLogInError';
import UserLoggedIn from './UserLoggedIn';
import handleGoogleAuth from '../SignUp/handleGoogleAuth';

function LogIn() {

  const [inputError, setInputError] = useState({
    emailError: false, 
    passwordError: false,
  });

  const [value, setValue] = useState({
    email: "", 
    password: "",
  });

  // Determine if user is logged in
  const [user] = useAuthState(auth);

  // Display message to user to verify their email if it is not verified already
  const [unverifiedEmail, setUnverifiedEmail] = useState(false);

  const detectInvalidInputs = (valueProp) => {
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
      
      setUnverifiedEmail(false);
      window.location = "/";

    } catch (error) {
      CatchLogInError(error, value, setInputError);
    }
  };

  useEffect(() => {
    // If the user is logged in, redirect them away from the log in page
    // if (user) return window.location = "/";
    // Only display message if the user attempts to log in and the email is not verified
    document.addEventListener('DOMContentLoaded', () => setUnverifiedEmail(false));
  }, [unverifiedEmail]);

  // If the user is already logged in, display a component/message that redirects them to the homepage
  if (user) return <UserLoggedIn />

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
          handleInputChange={detectInvalidInputs}
        />
        <InputField 
          error={inputError}
          classInput="password"
          inputType="password"
          placeholderText="Password"
          errorMessage="Invalid password."
          valueProp="password"
          handleInputChange={detectInvalidInputs}
        />
        {
          (unverifiedEmail) ? <span className="invalid-email">You must validate your email to log in.</span> : <></>
        }
        <button className="log-in-button-form">Log in</button>
        <p>Or</p>
        <GoggleButton handleClick={handleGoogleAuth} />
        <br/>
      </form>
    </div>
  );
}

export default LogIn;