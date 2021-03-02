import React from 'react';
import { FaStar } from 'react-icons/fa';
import "./styles/ModuleCard.css";

function ModuleCard({ item }) {
  return (
    <div className="module-card module-card-no-bg">
      <h2 className="campsite-title">{item.name}</h2>
      <div className="five-star-rating">
        {
          // Temporary star location
          [...Array(5)].map((star, i) => <FaStar key={i} size={20} className="campsite-stars" />)
        }
      </div>
    </div>
  );
}

export default ModuleCard;