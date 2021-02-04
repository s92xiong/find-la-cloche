import React from 'react';
import googleIcon from "../../images/google-icon.png";

function GoggleButton({ handleClick }) {
  return (
    <button 
      className="continue-with-google"
      onClick={handleClick}
    >
      <img src={googleIcon} alt=""/>
      Continue with Google
    </button>
  )
}

export default GoggleButton;
