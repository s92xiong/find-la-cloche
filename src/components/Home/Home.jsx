import React, { useState } from 'react';
import SearchBar from './SearchBar';
import "./styles/Home.css";

function Home() {

  // Input field is selected
  const [showCampsiteList, setShowCampsites] = useState(false);

  const hideCampsites = (e) => {
    // If the user clicks on the Home component or title, close the dropdown list
    if (e.target.className === "Home" || e.target.className === "home-title") {
      setShowCampsites(false);
    }
  };

  return (
    <div className="Home" onClick={hideCampsites}>
      <h2 className="home-title">Find your campsite</h2>
      <SearchBar showCampsiteList={showCampsiteList} setShowCampsites={setShowCampsites} />
    </div>
  );
}

export default Home;