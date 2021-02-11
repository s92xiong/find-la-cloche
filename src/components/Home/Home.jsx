import React, { useState } from 'react';
import SearchBar from './SearchBar';
import "./styles/Home.css";

function Home() {

  // Input field is selected
  const [showCampsiteList, setShowCampsites] = useState(false);

  const hideCampsites = (e) => {
    console.log(e.target);
    if (e.target.className !== "search-bar-input") {
      setShowCampsites(false);
    }
  };

  return (
    <div className="Home" onClick={hideCampsites}>
      <h2>Find your campsite</h2>
      <SearchBar showCampsiteList={showCampsiteList} setShowCampsites={setShowCampsites} />
    </div>
  );
}

export default Home;