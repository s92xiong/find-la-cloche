import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import GoggleButton from '../SignUp/GoggleButton';
import InputField from '../SignUp/InputField';
import "./styles/LogIn.css";

function LogIn() {

  const [inputError, setInputError] = useState({
    emailError: false, 
    passwordError: false,
  });

  const [value, setValue] = useState({
    email: "", 
    password: "",
  });

  const [invalidEmail, setInvalidEmail] = useState(false);

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
        return setInvalidEmail(true);
      }
      setInvalidEmail(false);
      window.location = "/";

    } catch {
      setInputError({ emailError: true, passwordError: true });
    }
  };

  const googleLogIn = async (e) => {
    e.preventDefault();
    console.log("Clicked Google button");
  };

  useEffect(() => {
    document.addEventListener('DOMContentLoaded', () => setInvalidEmail(false)); 
  }, [invalidEmail]);

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
        {
          (invalidEmail) ? <span className="invalid-email">You must validate your email to log in.</span> : <></>
        }
        <button className="log-in-button-form">Log in</button>
        <p>Or</p>
        <GoggleButton handleClick={googleLogIn} />
        <br/>
      </form>
    </div>
  );
}

export default LogIn;