import React from 'react';
import { FaStar, FaCheck, FaTimes } from 'react-icons/fa';
import "./styles/ReviewsList.css";

function ReviewsList({ reviewsList }) {

  const getYesOrNo = (value) => {
    if (value === "Yes") {
      return <FaCheck color="green" />
    } else {
      return <FaTimes color="red" />
    }
  }; 

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
                            <FaStar key={i} size={20} color={(i < rating) ? "#ffb400" : "#00000025"} />
                          )
                        })
                      }
                    </div>
                    <p>{review.date}</p>
                  </div>
                </div>
              </div>
              <div className="questions-container">
                <span>Firepit: {getYesOrNo(review.questions.firepit)}</span>
                <span>Seating: {getYesOrNo(review.questions.seating)}</span>
                <span>Hammock friendly: {getYesOrNo(review.questions.hammock)}</span>
                <span>Thunderbox: {getYesOrNo(review.questions.thunderbox)}</span>
                <span>Water access: {getYesOrNo(review.questions.water)}</span>
                <span>Privacy: {review.questions.privacy}</span>
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