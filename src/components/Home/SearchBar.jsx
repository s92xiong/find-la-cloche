import React, { useEffect, useState } from 'react';
import "./styles/SearchBar.css";
import "./styles/SearchList.css";
import searchIcon from "../../images/search-icon.png";
import SearchList from './SearchList';
import getCampsites from "./getCampsites";

function SearchBar({ showCampsiteList, setShowCampsites, currIndex, setCurrIndex }) {

  // Input value
  const [value, setValue] = useState("");

  // Array of campsites that are untouched
  const [immutableCampsites, setImmutableCampsites] = useState([]);

  // Array of campsites to be filtered & rendered to the DOM
  const [mutableCampsites, setMutableCampsites] = useState([]);

  // Render "No results" in dropdown if user-input doesn't match any campsite names
  const [noResults, setNoResults] = useState(false);

  // Handle input field change
  const handleInputChange = (e) => {
    setCurrIndex(-1);
    setValue(e.target.value);

    // Only show campsites matching user's text-input
    const filteredCampsites = immutableCampsites.filter(campsite => {
      return campsite.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    
    // If the filter loop returns an empty array, there are no valid search results
    (filteredCampsites.length < 1) ? setNoResults(true) : setNoResults(false);
    setMutableCampsites(filteredCampsites);
  };

  const pressUpKey = (e) => {
    if (e.key === "ArrowUp") {
      // Prevent index from moving up, starting default/inactive index is -1
      if (currIndex === -1 || currIndex === 0) return;
      
      const minusIndex = currIndex - 1;
      setCurrIndex(minusIndex);
      setValue(mutableCampsites[minusIndex].name);
    }
  };

  const pressDownKey = (e) => {
    if (e.key === "ArrowDown") {
      if (currIndex === mutableCampsites.length - 1) return;
      const plusIndex = currIndex + 1;
      setCurrIndex(plusIndex);
      setValue(mutableCampsites[plusIndex].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutableCampsites.forEach((campsite) => {
      if (campsite.name.toLowerCase() === value.toLowerCase()) {
        window.location = `/${campsite.id}`;
      }
    });
  };

  useEffect(() => {
    // Access DOM element of Search Bar (text input field)
    const inputField = document.querySelector(".search-bar-input");

    // Provide key function for Up & Down arrow keys
    inputField.addEventListener("keydown", pressUpKey);
    inputField.addEventListener("keydown", pressDownKey);

    return () => {
      inputField.removeEventListener("keydown", pressUpKey);
      inputField.removeEventListener("keydown", pressDownKey);
    };
  });
  
  useEffect(() => {
    getCampsites(mutableCampsites, setMutableCampsites, setImmutableCampsites);
  }, [mutableCampsites]);

  return (
    <div className="search-bar">
      <form className="search-bar-form" onSubmit={handleSubmit}>
        <div className="search-icon">
          <img src={searchIcon} alt=""/>
        </div>
        <input
          className="search-bar-input"
          type="text"
          onChange={handleInputChange}
          placeholder="Enter a campsite name"
          spellCheck="false"
          onFocus={() => setShowCampsites(true)}
          value={value}
        />
        <button>Search</button>
        <SearchList
          campsites={mutableCampsites}
          showCampsiteList={showCampsiteList}
          noResults={noResults}
          currIndex={currIndex}
        />
      </form>
    </div>
  );
}

export default SearchBar;