import React from 'react';
import { Link } from 'react-router-dom';
import "./styles/SearchList.css";

function SearchList({ campsites, showCampsiteList, noResults }) {

  if (noResults) return (
    <div className={
      (showCampsiteList) ? "search-list" : "search-list search-list-off"
    }>
      <ul>
        <li className="search-item">No results.</li>
      </ul>
    </div>
  );

  return (
    <div className={
      (showCampsiteList) ? "search-list" : "search-list search-list-off"
    }>
      <ul>
        {
          campsites.map((campsite, i) => {
            return (
              <Link 
                className="search-item-link" 
                // to={`campsite/${campsite.name.replace(/\s+/g, '-').toLowerCase()}`} 
                to={campsite.id}
                key={campsite.id}
              >
                <li 
                  className="search-item"
                >
                  {campsite.name}
                </li>
              </Link>
            );
          })
        }
      </ul>
    </div>
  );
}

export default SearchList;