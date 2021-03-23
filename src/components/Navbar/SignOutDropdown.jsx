import React from 'react';
import { auth } from '../../firebase';
import { Link } from 'react-router-dom';
import "./styles/SignOutDropdown.css";

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
        <Link className="home-link-dropdown" to="/">
          Home
        </Link>
      </li>
      <li onClick={handleSignOut}>
        <p>Logout</p>
      </li>
    </ul>
  );
}

export default SignOutDropdown;