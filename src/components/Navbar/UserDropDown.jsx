import React from 'react';
import "./styles/UserDropDown.css";

function UserDropDown() {
  return (
    <ul className="user-drop-down">
      <li>
        <a href="/">Profile</a>
      </li>
      <li>
        <a href="/">Logout</a>
      </li>
    </ul>
  );
}

export default UserDropDown;