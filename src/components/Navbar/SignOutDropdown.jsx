import React from 'react';
import { auth } from '../../firebase';
import "./styles/UserDropDown.css";

function SignOutDropdown() {

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
        <a href="/">Home</a>
      </li>
      <li onClick={handleSignOut}>
        <p>Logout</p>
      </li>
    </ul>
  );
}

export default SignOutDropdown;