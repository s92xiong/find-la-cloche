import React, { useEffect, useState } from 'react';
import AverageRating from './AverageRating';
import getAverageRating from '../logic/getAverageRating';
import "./styles/Card.css";

function Card({ item, match, reviewsList }) {

  // Initialize variable for average rating
  const [average, setAverage] = useState(null);

  useEffect(() => {
    setAverage(getAverageRating(reviewsList));
    return () => setAverage(null);
  }, [match, reviewsList]);

  return (
    <div
      // Provide a default background if there are no images for this campsite
      className={ (item && item.images.length >= 1) ? "module-card" : "module-card module-card-no-bg" }
      style={{
        // If the campsite has images, display the first image in the array
        backgroundImage: (item && item.images.length >= 1) && `url(${item.images[0].imgURL})`
      }}
    >
      <div className="module-info">
        <h2 className="campsite-title">{(item) && item.name}</h2>
        <AverageRating average={average} />
        <p className="park-name">Killarney Provincial Park</p>
      </div>
    </div>
  );
}

export default Card;