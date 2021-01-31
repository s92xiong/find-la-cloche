import React from 'react';
import "./styles/SignUp.css";
import "./styles/SignUpError.css"; 

function InputField({ error, classInput, inputType, placeholderText, errorMessage, dataID, value, setValue }) {

  const handleChange = (e) => {
    const newValue = { ...value };
    newValue.dataID = e.target.value;
    setValue(newValue);
    console.log(`${dataID} is ${newValue.dataID}`);
  }

  return (
    <div className="sign-up-form-child">
      <input
        data-id={dataID}
        className={
          !error ? 
          `sign-up-form-input ${classInput}`
          :
          `sign-up-form-input ${classInput} error` 
        }
        type={inputType} // text, email, or password
        placeholder={placeholderText}
        onChange={handleChange}
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