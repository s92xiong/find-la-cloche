import React, { useState } from 'react';
import "./styles/SearchBar.css";

function SearchBar() {

  // eslint-disable-next-line no-unused-vars
  const [inputFieldCampsite, setInputFieldCampsite] = useState("");

  const handleChange = (e) => setInputFieldCampsite(e.target.value);

  return (
    <div className="search-bar">
      <h2>Find Your Campsite</h2>
      <div>
        <input type="text" onChange={handleChange} />
        <button>Search</button>
      </div>
    </div>
  );
}

export default SearchBar;