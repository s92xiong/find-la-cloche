import React from 'react';
import "./styles/SignUp.css";
import "./styles/SignUpError.css"; 

function InputField({ 
    error, setInputError ,classInput, inputType, placeholderText, 
    errorMessage, dataID, value, setValue 
  }) {

  const handleInputChange = (e) => {
    // Copy value object state, update "key":"value" pair via dataID attribute
    const newValue = { ...value };
    newValue[dataID] = e.target.value;
    setValue(newValue);

    // Copy error object state
    const newError = {...error};
    const errorKey = `${dataID}Error`;

    console.log(newError[errorKey]);

    // A valid input requires 6 or more characters
    const requiredNumOfChars = (errorKey === "passwordError") ? 6 : 1;

    if (newValue[dataID].length >= requiredNumOfChars) {
      newError[errorKey] = false;
    } else {
      newError[errorKey] = true;
    }

    setInputError(newError);
  };

  return (
    <div className="sign-up-form-child">
      <input
        data-id={dataID} // Property name to access input field
        className={
          !error ? 
          `sign-up-form-input input-success ${classInput}`
          :
          `sign-up-form-input ${classInput} error` 
        }
        type={inputType} // text, email, or password
        placeholder={placeholderText}
        onChange={handleInputChange}
      />
      {
        error ?
        <span className="error-message">{errorMessage}</span> 
        :
        <></>
      }
    </div>
  );
}

export default InputField;