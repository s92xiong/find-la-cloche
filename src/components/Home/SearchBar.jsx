import React, { useEffect, useRef, useState } from 'react';
import "./styles/SearchBar.css";
import "./styles/SearchList.css";
import searchIcon from "../../images/search-icon.png";
import SearchList from './SearchList';
import getCampsites from "./getCampsites";

function SearchBar({ showCampsiteList, setShowCampsites }) {

  // Contains campsites that will be filtered and rendered to the DOM
  const [filteredCampsites, setFilteredCampsites] = useState([]);

  // Contains all campsites from db
  const [allCampsites, setAllCampsites] = useState([]);

  // Render "No results" in drop down if input doesn't match campsite name
  const [noResults, setNoResults] = useState(false);

  // Obtain reference to input field
  const inputRef = useRef();

  // Handle input field change
  const handleInputChange = (e) => {
    // Only show campsites matching user's text-input
    const filteredCampsites = allCampsites.filter(campsite => {
      return campsite.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    
    (filteredCampsites.length < 1) ? setNoResults(true) : setNoResults(false);
    setFilteredCampsites(filteredCampsites);
    setShowCampsites(true);
  };

  const openDropDownList = () => setShowCampsites(true);
  
  useEffect(() => {
    if (filteredCampsites.length < 1) {
      getCampsites(filteredCampsites, setFilteredCampsites, setAllCampsites);
    }
  }, [filteredCampsites, allCampsites]);

  return (
    <div className="search-bar">
      <form className="search-bar-form">
        <div className="search-icon">
          <img src={searchIcon} alt=""/>
        </div>
        <input
          className="search-bar-input"
          type="text" 
          onChange={handleInputChange}
          placeholder="Enter a campsite name"
          ref={inputRef}
          spellCheck="false"
          onFocus={openDropDownList}
        />
        <button>Search</button>
        <SearchList 
          campsites={filteredCampsites} 
          showCampsiteList={showCampsiteList} 
          noResults={noResults}
        />
      </form>
    </div>
  );
}

export default SearchBar;