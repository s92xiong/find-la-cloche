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

  // Must also change 'Create an account' div if the height changes so that it fits the screen in mobile view

  return (
    <div className="sign-up">
      <form className="sign-up-form" onSubmit={handleSignIn}>
        <h2 className="create-an-account">Create an account</h2>
        <InputField 
          error={inputError.firstNameError}
          setInputError={setInputError}
          classInput="first-name"
          inputType="text"
          placeholderText="First name"
          errorMessage="Enter your first name."
          dataID="firstName"
          value={value}
          setValue={setValue}
        />
        <InputField 
          error={inputError.lastNameError}
          setInputError={setInputError}
          classInput="last-name"
          inputType="text"
          placeholderText="Last name"
          errorMessage="Enter your last name."
          dataID="lastName"
          value={value}
          setValue={setValue}
        />
        <InputField 
          error={inputError.emailError}
          setInputError={setInputError}
          classInput="email"
          inputType="email"
          placeholderText="Email"
          errorMessage="Email is not valid."
          dataID="email"
          value={value}
          setValue={setValue}
        />
        <InputField 
          error={inputError.passwordError}
          setInputError={setInputError}
          classInput="password"
          inputType="password"
          placeholderText="Password"
          errorMessage="Password must be 6 characters long."
          dataID="password"
          value={value}
          setValue={setValue}
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