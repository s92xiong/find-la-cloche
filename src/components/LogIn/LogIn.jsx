import React, { useState } from 'react';
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

  const googleLogIn = () => console.log("Logging in via Google");

  return (
    <div className="log-in">
      <form className="log-in-form">
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
          errorMessage="Password must be 6 characters long."
          valueProp="password"
          handleInputChange={handleInputChange}
        />
        <GoggleButton handleClick={googleLogIn} />
      </form>
    </div>
  );
}

export default LogIn;