import React, { useState } from 'react';
import "./styles/SignUp.css";
import "./styles/SignUpError.css";
import googleIcon from "../../images/google-icon.png";
import InputField from './InputField';
import signInError from './signInError';
import { auth, firestore } from '../../firebase';
// import userIcon from "../../images/profile-icon.webp";

function SignUp() {

  const [inputError, setInputError] = useState({
    firstNameError: false, 
    lastNameError: false, 
    emailError: false, 
    passwordError: false,
  });

  const [value, setValue] = useState({
    firstName: "", 
    lastName: "", 
    email: "", 
    password: "",
  });

  // Display error message if email is already in use
  const [accountExists, setAccountExists] = useState(false);

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

  const createUserEmailPassword = async (e) => {
    e.preventDefault();
    // signInError returns a boolean & renders error messages for invalid input fields
    const areAllIputFieldsValid = signInError(value, inputError, setInputError);
    // Prevent form submission if any input fields are invalid
    if (!areAllIputFieldsValid) return console.log("Please fill in all input fields");

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(value.email, value.password);
      
      await userCredential.user.updateProfile({
        displayName: `${value.firstName} ${value.lastName}`,
      });

      console.log(`User ${userCredential.user.displayName} has signed in.`);
      // console.log(userCredential.user.photoURL);

      // Add user to Firestore db
      await firestore.collection("users").add({
        name: `${value.firstName} ${value.lastName}`,
        email: value.email,
        uid: userCredential.user.uid,
      });

      // Redirect to home page:
      window.location = "/";
      
    } catch (error) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") setAccountExists(true);
    }
  };

  const handleGoogleClick = (e) => {
    e.preventDefault();
    console.log("Continuing w/ Google");
  };

  return (
    <div className="sign-up">
      <form className="sign-up-form" onSubmit={createUserEmailPassword}>
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
        { (accountExists) ? <span className="existing-account">You already have an account. Please log in.</span> : <></> }
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