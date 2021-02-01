import React, { useState } from 'react';
import "./styles/SignUp.css";
import "./styles/SignUpError.css";
import googleIcon from "../../images/google-icon.png";
import InputField from './InputField';

function SignUp() {

  const [inputError, setInputError] = useState({
    firstNameError: false, lastNameError: false, emailError: false, passwordError: false,
  });

  const [value, setValue] = useState({
    firstName: "", lastName: "", email: "", password: "",
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

      // A valid input requires 6 or more characters
      const requiredNumOfChars = (errorProp === "passwordError") ? 6 : 1;

      // Determine if there is an error in the input value
      if (newValue[valueProp].length >= requiredNumOfChars) {
        newError[errorProp] = false;
      } else {
        newError[errorProp] = true;
      }

      setInputError(newError);
    };
    return handler;
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const newError = {...inputError};
    if (value.firstName.length < 1) newError.firstNameError = true;
    if (value.lastName.length < 1) newError.lastNameError = true;
    if (value.email.length < 1) newError.emailError = true;
    if (value.password.length < 6) newError.passwordError = true;
    setInputError(newError);
  };

  const handleGoogleClick = (e) => {
    e.preventDefault();
    console.log("Continuing w/ Google");
  }

  return (
    <div className="sign-up">
      <form className="sign-up-form" onSubmit={handleSignIn}>
        <h2 className="create-an-account">Create an account</h2>
        <InputField 
          error={inputError}
          classInput="first-name"
          inputType="text"
          placeholderText="First name"
          errorMessage="Enter your first name."
          valueProp="firstName"
          handleInputChange={handleInputChange}
        />
        <InputField 
          error={inputError}
          classInput="last-name"
          inputType="text"
          placeholderText="Last name"
          errorMessage="Enter your last name."
          valueProp="lastName"
          handleInputChange={handleInputChange}
        />
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
          errorMessage="Password must be 6 characters long."
          valueProp="password"
          handleInputChange={handleInputChange}
        />
        <button className="sign-up-form-button">Sign up</button>
        <p>Already have an account? <a className="log-in-a-tag" href="/log-in">
          Log in
        </a></p>
        <p>Or</p>
        <button 
          className="continue-with-google"
          onClick={handleGoogleClick}
        >
          <img src={googleIcon} alt=""/>
          Continue with Google
        </button>
        <br/>
      </form>
    </div>
  );
}

export default SignUp;