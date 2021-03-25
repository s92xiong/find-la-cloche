import React from 'react';
import { Link } from 'react-router-dom';
import "./styles/LoginRedirect.css";

function LoginRedirect() {
  return (
    <div className="log-in">
      <div className="continue-home">
        <h2>You're already logged in!</h2>
        <Link to="/" className="continue-home-button">
          Continue
        </Link>
      </div>
    </div>
  );
}

export default LoginRedirect;