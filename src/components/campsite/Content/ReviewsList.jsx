import React from 'react';
import { FaStar, FaCheck, FaTimes } from 'react-icons/fa';
import { auth } from '../../../firebase';
import deleteReview from "../logic/deleteReview";
import "./styles/ReviewsList.css";

function ReviewsList({ reviewsList, match, setReviewsList }) {

  const getYesOrNo = (value) => {
    if (value === "Yes") {
      return <FaCheck color="green" />
    } else {
      return <FaTimes color="red" />
    }
  };

  const handleDelete = (e) => {
    // Popup window to confirm if user wants to delete review
    const result = window.confirm("Are you sure you want to delete this review?");
    if (!result) return;

    // Get unique id from the element's "data-id"
    const dataID = Number(e.target.dataset.id);
    
    // Delete review by filtering through the reviewsList array state
    const filteredReviews = reviewsList.filter(review => (dataID !== review.reviewID));
    
    // Update Firestore
    deleteReview(match, filteredReviews, setReviewsList);
  };

  if (!reviewsList) return <></>;
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
                            <FaStar key={i} size={20} color={(i < rating) ? "gold" : "#00000025"} />
                          )
                        })
                      }
                    </div>
                    <p>{review.date}</p>
                  </div>
                </div>
              </div>
              <div className="questions-container">
                <p>Firepit: {getYesOrNo(review.questions.firepit)}</p>
                <p>Seating: {getYesOrNo(review.questions.seating)}</p>
                <p>Hammock friendly: {getYesOrNo(review.questions.hammock)}</p>
                <p>Thunderbox: {getYesOrNo(review.questions.thunderbox)}</p>
                <p>Water access: {getYesOrNo(review.questions.water)}</p>
                <p>Privacy: <span>{review.questions.privacy}</span></p>
              </div>
              <p className="review-body">{review.text}</p>
              {
                (review.userID === auth.currentUser.uid) ? 
                <div data-id={review.reviewID} className="edit-delete-review" onClick={handleDelete}>
                  Delete
                </div> 
                :
                <></>
              }
            </div>
          );
        })
      }
    </div>
  );
}

export default ReviewsList;