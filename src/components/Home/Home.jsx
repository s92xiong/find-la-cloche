import React, { useEffect, useState } from 'react';
import getCampsites from './getCampsites';
import SearchBar from './SearchBar';
import "./styles/Home.css";

function Home() {

  // eslint-disable-next-line no-unused-vars
  const [campsites, setCampsites] = useState([]);

  useEffect(() => {
    console.table(campsites);
  }, [campsites]);

  return (
    <div className="Home">
      <h2>Find your campsite</h2>
      <SearchBar getCampsites={getCampsites(campsites, setCampsites)} />
    </div>
  );
}

export default Home;