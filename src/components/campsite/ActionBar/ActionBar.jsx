import React, { useState } from 'react';
import "./styles/ActionBar.css";
import Photos from "../Photos/Photos";
import Reviews from "../Reviews/Reviews";

function ActionBar({ imgURLs, setImgURLs, campsites, match, item, reviewsList, setReviewsList }) {

  const [toggleState, setToggleState] = useState(0);
  const toggleTab = (number) => setToggleState(number);

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
            <span>Reviews</span>
          </div>
          <div 
            onClick={() => toggleTab(1)}
            className={ 
              (toggleState === 1) ? "tab reviews-tab tab-indicator" : "tab photos-tab"
            }
          >
            <span>Photos</span>
          </div>
        </div>
      </div>
      {
        (toggleState === 1) ?
        <Photos 
          imgURLs={imgURLs}
          setImgURLs={setImgURLs}
          campsites={campsites}
          match={match}
        />
        :
        <Reviews
          item={item}
          match={match}
          campsites={campsites}
          reviewsList={reviewsList}
          setReviewsList={setReviewsList}
        />
      }
    </div>
  );
}

export default ActionBar;