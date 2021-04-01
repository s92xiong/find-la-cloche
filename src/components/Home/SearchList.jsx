import React from 'react';
import { Link } from 'react-router-dom';
import "./styles/SearchList.css";

function SearchList({ campsites, showCampsiteList, noResults, currIndex, setCurrIndex }) {

  if (noResults) return (
    <div className={(showCampsiteList) ? "search-list" : "search-list search-list-off"}>
      <ul>
        <li className="search-item">No results.</li>
      </ul>
    </div>
  );

  return (
    <div className={(showCampsiteList) ? "search-list" : "search-list hide"}>
      <ul>
        {
          campsites.map((campsite, i) => {
            return (
              <Link 
                className="search-item-link"
                // to={`/${campsite.name.replace(/\s+/g, '-').toLowerCase()}`}
                to={campsite.id}
                key={campsite.id}
              >
                <li 
                  className={ (i !== currIndex) ? "search-item" : "search-item item-highlighted" }
                  onMouseEnter={() => setCurrIndex(i)}
                  onMouseLeave={() => setCurrIndex(-1)}
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