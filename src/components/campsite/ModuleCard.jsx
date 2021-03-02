import React from 'react';
import { FaStar } from 'react-icons/fa';
import "./styles/ModuleCard.css";

function ModuleCard({ item, imgURLs }) {
  return (
    <div 
      className={ (imgURLs.length > 1) ? "module-card" : "module-card module-card-no-bg" }
      style={{
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
        <p className="park-information">Killarney Provincial Park</p>
      </div>
    </div>
  );
}

export default ModuleCard;