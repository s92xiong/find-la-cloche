import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import AverageRating from './AverageRating';
import "./styles/Card.css";
import getAverageRating from './getAverageRating';

function Card({ item, imgURLs, match, reviewsList }) {

  // Initialize variable for average rating
  const [average, setAverage] = useState(null);

  useEffect(() => {
    setAverage(getAverageRating(reviewsList));
    return () => setAverage(null);
  }, [match, reviewsList]);

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
        <AverageRating average={average} />
        <p className="park-name">Killarney Provincial Park</p>
      </div>
    </div>
  );
}

export default Card;