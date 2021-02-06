import React from 'react';
import "./styles/UserLoggedIn.css";

function UserLoggedIn() {

  const redirectToHomePage = () => window.location = "/";

  return (
    <div className="user-logged-in">
      <div className="user-logged-in-child">
        <p>You are already signed in.</p>
        <button onClick={redirectToHomePage}>Continue</button>
      </div>
    </div>
  )
}

export default UserLoggedIn;