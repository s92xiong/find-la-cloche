import React, { useEffect, useState } from 'react';
import "./styles/SearchBar.css";
import "./styles/SearchList.css";
import searchIcon from "../../images/search-icon.png";
import SearchList from './SearchList';
import getCampsites from "./getCampsites";

function SearchBar({ showCampsiteList, setShowCampsites }) {

  // Array of campsites that are untouched
  const [immutableCampsites, setImmutableCampsites] = useState([]);

  // Array of campsites to be filtered & rendered to the DOM
  const [mutableCampsites, setMutableCampsites] = useState([]);

  // Render "No results" in dropdown if user-input doesn't match any campsite names
  const [noResults, setNoResults] = useState(false);

  // Handle input field change
  const handleInputChange = (e) => {
    // Only show campsites matching user's text-input
    const filteredCampsites = immutableCampsites.filter(campsite => {
      return campsite.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    
    // If the filter loop returns an empty array, there are no valid search results
    (filteredCampsites.length < 1) ? setNoResults(true) : setNoResults(false);
    setMutableCampsites(filteredCampsites);
  };
  
  useEffect(() => {
    getCampsites(mutableCampsites, setMutableCampsites, setImmutableCampsites);
  }, [mutableCampsites]);

  return (
    <div className="search-bar">
      <form className="search-bar-form" onSubmit={(e) => e.preventDefault()}>
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
        />
        <button>Search</button>
        <SearchList
          campsites={mutableCampsites}
          showCampsiteList={showCampsiteList}
          noResults={noResults}
        />
      </form>
    </div>
  );
}

export default SearchBar;