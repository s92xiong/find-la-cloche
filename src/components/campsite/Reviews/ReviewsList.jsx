import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaStar, FaCheck, FaTimes } from 'react-icons/fa';
import { auth } from '../../../firebase';
import deleteReview from "../logic/deleteReview";
import userIcon from "../../../images/person_placeholder.png";
import "./styles/ReviewsList.css";

function ReviewsList({ match, item, setItem, userData }) {

  const [user] = useAuthState(auth);

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
    const filteredReviews = item.reviews.filter(review => (dataID !== review.reviewID));
    
    // Update Firestore
    deleteReview(match, filteredReviews, item, setItem);
  };

  if (!item || item.reviews.length < 1) return <></>;
  return (
    <div className="reviews-list">
      {
        item.reviews.map(review => {
          const rating = review.rating;
          return (
            // Render photoURL, user name, rating, date, and text body
            <div className="review-container">
              <div className="left-review-container">
                <div className="review-user-info">
                  <img src={(review.photoURL) ? review.photoURL : userIcon} alt=""/>
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
                <p className="review-body">{review.text}</p>
              </div>
              <div className="questions-container">
                <p>Firepit: {getYesOrNo(review.questions.firepit)}</p>
                <p>Tent pad: <span>{getYesOrNo(review.questions.tentpad)}</span></p>
                <p>Thunderbox: {getYesOrNo(review.questions.thunderbox)}</p>
                <p>Hammock friendly: {getYesOrNo(review.questions.hammock)}</p>
                <p>Water quality: <span>{review.questions.water}</span></p>
                <p>Privacy: <span>{review.questions.privacy}</span></p>
              </div>
              {
                (user && review.userID === user.uid) &&
                <div 
                  data-id={review.reviewID} 
                  className="edit-delete-review"
                  onClick={handleDelete}
                >
                  Delete
                </div>
              }
            </div>
          );
        })
      }
    </div>
  );
}

export default ReviewsList;