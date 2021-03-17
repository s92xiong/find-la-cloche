import React from 'react';
import { FaStar } from 'react-icons/fa';
import HalfStar from './HalfStar';

function AverageRating({ average }) {

  // If there is no average (no reviews), render 5 grey stars
  if (!average) {
    return (
      <div className="five-star-rating-card">
        {
          [...Array(5)].map((star, i) => {
            return (
              <div key={i} className="full-star-container">
                <FaStar size={20} color="#f1f1f1" />
              </div>
              
            );
          })
        }
      </div>
    );
  }

  // If there is an average rating (reviews exist), render the average rating
  return (
    <div className="five-star-rating-card">
      {
        [...Array(5)].map((star, i) => {
          // Return a 1/2 star given the following condition
          if (average === i + 0.5 && i === average - 0.5) {
            return <HalfStar index={i} />
          }
          // Return gold star if the index is less than the average
          if (i < average) {
            return (
              <div className="full-star-container">
                <FaStar size={20} color="#ffb400" />
              </div>
            );
          } else {
            // Return a grey star if the index is greater than the average
            return (
              <div className="full-star-container">
                <FaStar size={20} color="#f1f1f1" />
              </div>
            );
          }
        })
      }
    </div>
  );
}

export default AverageRating;