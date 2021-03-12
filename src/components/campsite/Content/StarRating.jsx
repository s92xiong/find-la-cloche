import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

function StarRating({ rating, setRating }) {

  const [hover, setHover] = useState(null);

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
            onClick={() => setRating(Number(ratingValue))}
          />
          <FaStar
            size={35}
            className="review-star"
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
            color={ (ratingValue <= ( hover || rating)) ? "gold" : "grey" }
          />
        </label>
      );
    })
  );
}

export default StarRating;