import React from 'react';
import "./styles/EmailVerification.css";
import emailIcon from "../../images/email-icon.png";

function EmailVerification() {

  return (
    <div className="sign-up">
      <div className="email-verification-sent">
        <img src={emailIcon} alt=""/>
        <h1>Welcome!</h1>
        <p>Thanks for signing up! Please verify your email address before logging in.</p>
        <a className="link-to-log-in-button" href="/log-in">
          <div>
            Continue
          </div>
        </a>
      </div>
    </div>
  )
}

export default EmailVerification;