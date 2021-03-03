import React from 'react';
import { FaStar } from 'react-icons/fa';
import "./Card.css";

function ModuleCard({ item, imgURLs }) {
  return (
    <div
      // Provide a backup background if there are no images for this campsite
      className={ (imgURLs.length > 1) ? "module-card" : "module-card module-card-no-bg" }
      style={{
        // If the campsite has images, display the first image in the array
        backgroundImage: (imgURLs.length > 1) && `url(${imgURLs[0].urlString})`
      }}
    >
      <div className="module-info">
        <h2 className="campsite-title">{item.name}</h2>
        <div className="five-star-rating">
          {
            // Temporary star location
            [...Array(5)].map((star, i) => <FaStar key={i} size={20} className="campsite-stars" />)
          }
        </div>
        <p className="park-name">Killarney Provincial Park</p>
      </div>
    </div>
  );
}

export default ModuleCard;