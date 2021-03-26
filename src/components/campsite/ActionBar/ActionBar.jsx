import React, { useState } from 'react';
import "./styles/ActionBar.css";
import Reviews from "../Reviews/Reviews";
import Photos from '../Photos/Photos';

function ActionBar({ imgURLs, setImgURLs, campsites, match, item, setItem, reviewsList, setReviewsList }) {

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
          match={match}
          item={item}
          setItem={setItem}
          imgURLs={imgURLs}
          setImgURLs={setImgURLs}
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