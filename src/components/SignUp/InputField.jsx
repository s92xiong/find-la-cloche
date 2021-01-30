import React from 'react';
import "./styles/SignUp.css";
import "./styles/SignUpError.css"; 

function InputField({ error, classInput, inputType, placeholderText, errorMessage }) {
  return (
    <div className="sign-up-form-child">
      <input
        className={
          !error ? 
          `sign-up-form-input ${classInput}` 
          :  
          `sign-up-form-input ${classInput} error` 
        } 
        type={inputType} 
        placeholder={placeholderText}
      />
      <span className={`error-message ${classInput}-error-message`}>{errorMessage}</span>
    </div>
  );
}

export default InputField;