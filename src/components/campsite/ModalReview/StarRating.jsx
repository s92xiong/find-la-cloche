import React, { useState } from 'react';
import "./StarRating.css";
import { FaStar } from 'react-icons/fa';

function StarRating({ rating, handleRating }) {

  const [hover, setHover] = useState(null);

  return (
    [...Array(5)].map((star, i) => {
      const ratingValue = i + 1;
      return (
        <label key={i}>
          <input
            type="radio"
            name="rating"
            style={{ display: "none" }}
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