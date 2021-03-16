import React from 'react';
import "./styles/Header.css";
import Dropdown from "./Dropdown";

function Header({ campsites, match }) {
  return (
    <div className="campsite-header">
      <Dropdown campsites={campsites} match={match} />
    </div>
  );
}

export default Header;