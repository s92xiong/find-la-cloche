import React, { useState } from 'react';
import "./styles/Content.css";
import Photos from "./Photos";
import Reviews from "./Reviews";

function Content({ imgURLs, setImgURLs, campsites, match, item }) {

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="content">
      <div className="tab-bar">
        <div className="tab-container">
          <div 
            onClick={() => toggleTab(0)}
            className={ 
              (toggleState === 0) ? "tab photos-tab tab-indicator" : "tab photos-tab"
            }
          >
            <span>Photos</span>
          </div>
          <div 
            onClick={() => toggleTab(1)}
            className={ 
              (toggleState === 1) ? "tab reviews-tab tab-indicator" : "tab photos-tab"
            }
          >
            <span>Reviews</span>
          </div>
        </div>
      </div>
      {
        (toggleState === 0) ?
        <Photos imgURLs={imgURLs} setImgURLs={setImgURLs} campsites={campsites} match={match} />
        :
        <Reviews item={item} />
      }
    </div>

  );
}

export default Content;