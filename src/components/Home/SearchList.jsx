import React from 'react';
import "./styles/SearchList.css";

function SearchList({ campsites, showCampsiteList }) {
  if (campsites.length < 1) return <></>;
  return (
    <div className={
      (showCampsiteList) ? "search-list" : "search-list search-list-off"
    }>
      <ul>
        {
          campsites.map((campsite, index) => (
            <li 
              className="search-item"
              key={campsite.id}
            >
              {campsite.name}
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default SearchList;