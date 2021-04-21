import React from 'react';
import StarRating from './StarRating';

function Page0({ rating, userText, handleRating, handleChange }) {
  
  const placeholderText = "Give back to the community. Share your thoughts about this campsite so others know what to expect.";

  return (
    <div className="review-modal-0">
      <div className="five-star-rating">
        <StarRating
          rating={rating}
          handleRating={handleRating}
        />
        <div className="text-box-container">
          <textarea 
            placeholder={placeholderText}
            name="review-text-box"
            id="reviewBox"
            className="review-text-box"
            onChange={handleChange}
            maxlength="10000"
            value={userText}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default Page0;