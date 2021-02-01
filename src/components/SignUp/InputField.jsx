import React from 'react';
import "./styles/SignUp.css";
import "./styles/SignUpError.css"; 

function InputField({ 
    error, setInputError, classInput, inputType, placeholderText, 
    errorMessage, valueProp, value, setValue 
  }) {

  const errorProp = `${valueProp}Error`;

  const handleInputChange = (e) => {
    // Copy value object state, update "key":"value" pair via dataID attribute
    const newValue = { ...value };
    newValue[valueProp] = e.target.value;
    setValue(newValue);

    // Copy error object state
    const newError = {...error};

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

  return (
    <div className="sign-up-form-child">
      <input
        data-id={valueProp} // Property name to access input field
        className={
          (!error[errorProp]) ? 
          `sign-up-form-input input-success ${classInput}`
          :
          `sign-up-form-input ${classInput} error` 
        }
        type={inputType} // text, email, or password
        placeholder={placeholderText}
        onChange={handleInputChange}
      />
      {
        (error[errorProp]) ?
        <span className="error-message">{errorMessage}</span> 
        :
        <></>
      }
    </div>
  );
}

export default InputField;