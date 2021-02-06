import React, { useEffect, useState } from 'react';
import "./styles/SignUp.css";
import "./styles/SignUpError.css";
import InputField from './InputField';
import signInError from './signInError';
import GoogleButton from "./GoggleButton";
import { auth, firestore } from '../../firebase';
import EmailVerification from './EmailVerification';
import { useAuthState } from 'react-firebase-hooks/auth';
import UserLoggedIn from "../LogIn/UserLoggedIn";

function SignUp() {

  const [user] = useAuthState(auth);

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
  const [accountAlreadyInUse, setAccountAlreadyInUse] = useState(false);

  // Display message after the user has successfully created an account
  const [emailVerificationPopup, setEmailVerificationPopup] = useState(false);

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
    
    // Prevent form submission if any input fields are invalid
    const areAllIputFieldsValid = signInError(value, inputError, setInputError);
    if (!areAllIputFieldsValid) return console.log("Please fill in all input fields");

    try {
      // Create user and automatically log in
      const userCredential = await auth.createUserWithEmailAndPassword(value.email, value.password);
      await userCredential.user.updateProfile({
        displayName: `${value.firstName} ${value.lastName}`,
      });

      // Add user to Firestore
      await firestore.collection("users").add({
        name: `${value.firstName} ${value.lastName}`,
        email: value.email,
        uid: userCredential.user.uid,
      });

      // Send an email verification letter to the newly registered user
      await auth.currentUser.sendEmailVerification()
      .then(() => console.log("Email verification letter has been sent."));

      // Sign user out immediately, they should only be able to sign back in if they have verified their email
      await auth.signOut();

      // Render a pop-up div when the user has signed in
      setEmailVerificationPopup(true);

    } catch (error) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") setAccountAlreadyInUse(true);
    }
  };

  const handleGoogleClick = (e) => {
    e.preventDefault();
    console.log("Continuing w/ Google");
  };

  useEffect(() => {
    // if (user) return window.location = "/";
    document.addEventListener('DOMContentLoaded', () => setEmailVerificationPopup(false)); 
  }, [emailVerificationPopup, user]);

  // Render a modal/popup that prevents users from accessing SignUp component if already logged in
  if (user) return <UserLoggedIn />;

  // Render popup if a new account is created & an email ver letter is sent
  if (emailVerificationPopup) return <EmailVerification />;

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
        { (accountAlreadyInUse) ? <span className="existing-account">You already have an account. Please log in.</span> : <></> }
        <button className="sign-up-form-button">Sign up</button>
        <p>Already have an account? <a className="log-in-a-tag" href="/log-in">Log in</a></p>
        <p>Or</p>
        <GoogleButton handleClick={handleGoogleClick} />
        <br/>
      </form>
    </div>
  );
}

export default SignUp;