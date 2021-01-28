import React from 'react';
import SearchBar from './SearchBar';
import "./styles/Home.css";

function Home() {
  return (
    <div className="Home">
      <h2>Find your campsite</h2>
      <SearchBar />
    </div>
  );
}

export default Home;