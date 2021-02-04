import React from 'react';
import { auth } from '../../firebase';
import "./styles/UserDropDown.css";

function UserDropDown() {

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ul className="ul-drop-down">
      <li>
        <a href="/">Profile</a>
      </li>
      <li onClick={handleSignOut}>
        <p>Logout</p>
      </li>
    </ul>
  );
}

export default UserDropDown;