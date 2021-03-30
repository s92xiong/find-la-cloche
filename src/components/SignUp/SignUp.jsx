import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import EmailVerification from './EmailVerification';
import InputField from './InputField';
import GoogleButton from "./GoggleButton";
import signInError from './logic/signInError';
import handleGoogleAuth from './logic/handleGoogleAuth';
import "./styles/SignUp.css";
import "./styles/SignUpError.css";

function SignUp() {

  // Check to see if user is logged in
  const [user] = useAuthState(auth);

  // When registering a new account, the user is automatically logged in, but a logged-in user who accesses this page is immediately
  // redirected to the homepage via useEffect, thus "isNewAccountCreated" prevents page redirect for that brief moment when
  // the user is logged in and signed out (this enforces user to validate their email)
  const [isNewAccountCreated, setNewAccountCreated] = useState(false);

  // Display error message if email is already in use
  const [accountAlreadyInUse, setAccountAlreadyInUse] = useState(false);

  // Display message after the user has successfully created an account
  const [emailVerificationPopup, setEmailVerificationPopup] = useState(false);

  // Initialize state object for invalid inputs
  const [inputError, setInputError] = useState({
    firstNameError: false, 
    lastNameError: false, 
    emailError: false, 
    passwordError: false,
  });

  // Input values for sign-up form field
  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (valueProp) => {
    const handler = (e) => {
      // Copy value object state, update the specific "key":"value" pair using dataID attribute
      const newValue = { ...value };
      newValue[valueProp] = e.target.value;
      setValue(newValue);

      // Copy error object state
      const newError = {...inputError};
      const errorProp = `${valueProp}Error`;

      // If the input field is for a password, it requires 6 or more characters
      // For every other input field, the string length must at least be 1 or more characters
      const requiredNumOfChars = (errorProp === "passwordError") ? 6 : 1;

      // Determine if there is an error in the input value
      if (newValue[valueProp].length >= requiredNumOfChars) {
        newError[errorProp] = false; // Valid input
      } else {
        newError[errorProp] = true; // Invalid input
      }

      // Update error state
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
      // Prevent useEffect from automatically redirecting to homepage upon logging in
      setNewAccountCreated(true);

      // Create user and automatically log in
      const userCredential = await auth.createUserWithEmailAndPassword(value.email, value.password);
      await userCredential.user.updateProfile({
        displayName: `${value.firstName} ${value.lastName}`,
      });

      // Add user to Firestore
      // await firestore.collection("users").add({
      //   email: value.email,
      //   reviews: [],
      //   uid: userCredential.user.uid,
      // });

      // Send an email verification letter to the newly registered user
      await auth.currentUser.sendEmailVerification();

      // Sign user out immediately, they should only be able to sign back in if they have verified their email
      await auth.signOut();

      // Render a pop-up div when the user has signed in
      setEmailVerificationPopup(true);

    } catch (error) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        setAccountAlreadyInUse(true);
      }
    }
  };

  useEffect(() => {
    // Redirect to homepage if the user is logged in & they aren't registering a new account
    if (user && !isNewAccountCreated) {
      return window.location = "/";
    }
  }, [user, isNewAccountCreated]);

  // Component prevents users from accessing SignUp component if already logged in
  // if (user) return <UserLoggedIn />;

  // Render component if a new account is created & an email verification letter is sent
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
        { 
          (accountAlreadyInUse) ? 
          <span className="existing-account">You already have an account. Please log in.</span> 
          : 
          <></> 
        }
        <button className="sign-up-form-button">Sign up</button>
        <p>Already have an account? <a className="log-in-a-tag" href="/log-in">Log in</a></p>
        <p>Or</p>
        <GoogleButton handleClick={handleGoogleAuth} />
      </form>
    </div>
  );
}

export default SignUp;