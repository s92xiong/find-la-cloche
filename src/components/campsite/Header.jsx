import React from 'react';
import "./styles/Header.css";
import SelectCampsite from './SelectCampsite';

function Header({ campsites }) {
  return (
    <div className="campsite-header">
      <SelectCampsite campsites={campsites} />
    </div>
  );
}

export default Header;