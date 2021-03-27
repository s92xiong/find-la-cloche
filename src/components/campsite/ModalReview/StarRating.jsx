import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

function StarRating({ rating, setRating, userText, setContinue }) {

  const [hover, setHover] = useState(null);

  // Execute event handler when user clicks on 1 of the 5 stars
  const handleRating = (ratingValue) => {
    const handler = () => {
      // Activate/highlight the "Next" button so the user can proceed to the next page
      (userText.length >= 1) && setContinue(true);
      return setRating(Number(ratingValue));
    };
    return handler;
  };

  return (
    [...Array(5)].map((star, i) => {
      const ratingValue = i + 1;
      return (
        <label key={i}>
          <input
            type="radio"
            name="rating"
            className="radio-star"
            value={ratingValue}
            onClick={handleRating(ratingValue)}
          />
          <FaStar
            size={35}
            className="review-star"
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
            color={ (ratingValue <= ( hover || rating)) ? "gold" : "#f1f1f1" }
          />
        </label>
      );
    })
  );
}

export default StarRating;