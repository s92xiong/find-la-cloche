import React from 'react';
import { FaStar } from 'react-icons/fa';
import "./styles/ReviewsList.css";

function ReviewsList({ reviewsList }) {

  if (!reviewsList) return <></>;
  return (
    <div className="reviews-list">
      {
        reviewsList.map(reviewObj => {
          return (
            // Render photoURL, user name, rating, date, and text body
            <div className="review-container">
              <div className="review-user-info">
                <img src={reviewObj.photoURL} alt=""/>
                <div className="user-review-date">
                  <h4>{reviewObj.name}</h4>
                  <div>
                    <div className="user-star-container">
                      {
                        [...Array(reviewObj.rating)].map((star, i) => {
                          return (
                            <FaStar key={i} size={20} className="user-star-review" />
                          )
                        })
                      }  
                    </div>
                    <p>{reviewObj.date}</p>
                  </div>
                </div>
              </div>
              <p className="review-body">{reviewObj.text}</p>
            </div>
          );
        })
      }
    </div>
  );
}

export default ReviewsList;