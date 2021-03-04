import React from 'react';
import "./styles/Photos.css";

function Photos({ imgURLs }) {
  return (
    <div className="photos-container">
      {
        imgURLs.map((url, i) => {
          return (
            <div className="image-container" key={i}>
              <img className="square-photo" src={url.urlString} alt=""/>
            </div>
          );
        })
      }
    </div>
  );
}

export default Photos;