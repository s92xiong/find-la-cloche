import React from 'react';
import "./styles/UserDropDown.css";

function UserDropDown() {
  return (
    <ul className="user-drop-down">
      <li>
        <a href="/">Profile</a>
      </li>
      <li>
        <p>Logout</p>
      </li>
    </ul>
  );
}

export default UserDropDown;