import React from 'react';
import getCampsites from './getCampsites';
import SearchBar from './SearchBar';
import "./styles/Home.css";

function Home({ campsites, setCampsites }) {

  const renderCampsites = () => {
    getCampsites(campsites, setCampsites);
  };

  return (
    <div className="Home">
      <h2>Find your campsite</h2>
      <SearchBar renderCampsites={renderCampsites} />
    </div>
  );
}

export default Home;