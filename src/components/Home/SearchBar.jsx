import React, { useRef, useState } from 'react';
import "./styles/SearchBar.css";
import searchIcon from "../../images/search-icon.png";

function SearchBar({ getCampsites }) {
  const [inputFieldCampsite, setInputFieldCampsite] = useState("");
  const inputRef = useRef();

  const handleChange = (e) => setInputFieldCampsite(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputFieldCampsite);
    inputRef.current.value = "";
  }

  return (
    <div className="search-bar">
      <form className="search-bar-form" onSubmit={handleSubmit}>
        <div className="search-icon">
          <img src={searchIcon} alt=""/>
        </div>
        <input 
          type="text" 
          onChange={handleChange}
          placeholder="Enter a campsite name"
          ref={inputRef}
          spellCheck="false"
          onFocus={getCampsites}
        />
        <button>Search</button>
      </form>
    </div>
  );
}

export default SearchBar;