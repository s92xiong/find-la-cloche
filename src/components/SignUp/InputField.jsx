import React from 'react';
import "./styles/SignUp.css";
import "./styles/SignUpError.css"; 

function InputField({ handleInputChange, error, classInput, inputType, placeholderText, errorMessage, valueProp }) {
  return (
    <div className="sign-up-form-child">
      <input
        data-id={valueProp} // Property name to access input field
        className={
          // Use bracket notation to access the property name of the error state object
          (!error[`${valueProp}Error`]) ? 
          `sign-up-form-input input-success ${classInput}`
          :
          `sign-up-form-input ${classInput} error` 
        }
        type={inputType} // text, email, or password
        placeholder={placeholderText}
        onChange={handleInputChange(valueProp)}
      />
      {
        (error[`${valueProp}Error`]) ?
        <span className="error-message">{errorMessage}</span> 
        :
        <></>
      }
    </div>
  );
}

export default InputField;