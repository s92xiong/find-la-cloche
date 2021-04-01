import React, { useState } from 'react';
import SearchBar from './SearchBar';
import "./styles/Home.css";

function Home() {

  // Input field is selected
  const [showCampsiteList, setShowCampsites] = useState(false);

  // Selects or highlights a campsite in the SearchList dropdown menu using Up & Down arow keys
  const [currIndex, setCurrIndex] = useState(-1);

  const hideCampsites = (e) => {
    // Close SearchList if the user clicks on the Home component or h1 tag
    if (e.target.className === "Home" || e.target.className === "home-title") {
      setShowCampsites(false);
      setCurrIndex(-1);
    }
  };

  return (
    <div className="Home" onClick={hideCampsites}>
      <h2 className="home-title">Find your campsite</h2>
      <SearchBar 
        showCampsiteList={showCampsiteList}
        setShowCampsites={setShowCampsites}
        currIndex={currIndex}
        setCurrIndex={setCurrIndex}
      />
    </div>
  );
}

export default Home;