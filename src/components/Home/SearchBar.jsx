import React, { useRef, useState } from 'react';
import "./styles/SearchBar.css";
import "./styles/SearchList.css";
import searchIcon from "../../images/search-icon.png";
import getCampsites from './getCampsites';
import SearchList from './SearchList';

function SearchBar({ showCampsiteList, setShowCampsites }) {

  // Campsites from Firestore db
  const [campsites, setCampsites] = useState([]);

  // Manage state of input field
  const [inputFieldCampsite, setInputFieldCampsite] = useState("");

  // Obtain reference to input field
  const inputRef = useRef();

  // Handle input field change
  const handleChange = (e) => {
    const newCampsites = campsites.filter(campsite => campsite.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setCampsites(newCampsites);
    setInputFieldCampsite(e.target.value);
    setShowCampsites(true);
  };

  // Handle Form submission
  // YOU DON'T NEED A SUBMIT BUTTON!!! EVERYTHING SHOULD BE DONE IN THE ONCHANGE PROP
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputFieldCampsite);
    inputRef.current.value = "";
  };

  const renderCampsites = () => {
    getCampsites(campsites, setCampsites);
    setShowCampsites(true);
  };

  return (
    <div className="search-bar">
      <form className="search-bar-form" onSubmit={handleSubmit}>
        <div className="search-icon">
          <img src={searchIcon} alt=""/>
        </div>
        <input
          className="search-bar-input"
          type="text" 
          onChange={handleChange}
          placeholder="Enter a campsite name"
          ref={inputRef}
          spellCheck="false"
          onFocus={renderCampsites}
        />
        <button>Search</button>
        <SearchList campsites={campsites} showCampsiteList={showCampsiteList} />
      </form>
    </div>
  );
}

export default SearchBar;