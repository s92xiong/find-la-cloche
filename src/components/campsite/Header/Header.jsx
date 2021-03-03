import React from 'react';
import "./styles/Header.css";
import Dropdown from "./Dropdown";

function Header({ campsites }) {
  return (
    <div className="campsite-header">
      <Dropdown campsites={campsites} />
    </div>
  );
}

export default Header;