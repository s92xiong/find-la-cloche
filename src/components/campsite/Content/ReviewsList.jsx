import React from 'react';
import { FaStar } from 'react-icons/fa';
import "./styles/ReviewsList.css";

function ReviewsList({ reviewsList }) {

  if (reviewsList.length === 0) return <></>;
  return (
    <div className="reviews-list">
      {
        reviewsList.map(review => {
          const rating = review.rating;
          return (
            // Render photoURL, user name, rating, date, and text body
            <div className="review-container">
              <div className="review-user-info">
                <img src={review.photoURL} alt=""/>
                <div className="user-review-date">
                  <h4>{review.name}</h4>
                  <div>
                    <div className="user-star-container">
                      {
                        [...Array(5)].map((star, i) => {
                          return (
                            // If the index is less than the rating, then render a gold star
                            <FaStar key={i} size={20} color={(i < rating) ? "#ffb400" : "#00000042"} />
                          )
                        })
                      }
                    </div>
                    <p>{review.date}, Rating: {review.rating}</p>
                  </div>
                </div>
              </div>
              <p className="review-body">{review.text}</p>
            </div>
          );
        })
      }
    </div>
  );
}

export default ReviewsList;