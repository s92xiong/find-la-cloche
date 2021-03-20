import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

function StarRating({ rating, setRating, userText, setContinue }) {

  const [hover, setHover] = useState(null);

  const handleRating = (ratingValue) => {
    const handler = () => {
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