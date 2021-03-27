import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase';
import ReviewsList from './ReviewsList';
import "./styles/Reviews.css";
import ModalReview from '../ModalReview/ModalReview';

function Reviews({ item, match, campsites, reviewsList, setReviewsList }) {

  // Check if user is logged in
  const [user] = useAuthState(auth);

  // Render a error message if unauthorized user tries to upload photos
  const [errorMessage, setErrorMessage] = useState(false);

  // Check if modal is open or not
  const [modalOpen, setModalOpen] = useState(false);

  const handleWriteReview = () => {
    if (!user) return setErrorMessage(true);
    setModalOpen(true);
  };

  useEffect(() => {
    if (errorMessage) setTimeout(() => setErrorMessage(false), 3000);
  });

  return (
    <div className="reviews-container">
      <div className="write-review-button-container">
        {
          (!reviewsList) ?
          <div className="no-reviews">
            <h2>There are currently no reviews</h2>
            <p>Be the first person to review this campsite!</p>
          </div>
          :
          <div className="add-review-message">
            <h2>Reviews ({reviewsList.length})</h2>
            <p>Help your fellow backpackers by adding a review.</p>
          </div>
        }
        <div>
          <button className="review-button" onClick={handleWriteReview}>
            Write review
            {
              (errorMessage) ?
              <span className="upload-error upload-error-review">You must be logged in</span> : <></>
            }
          </button>
        </div>
      </div>
      <ReviewsList
        reviewsList={reviewsList}
        match={match}
        setReviewsList={setReviewsList}
      />
      <ModalReview
        match={match}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        item={item}
        setReviewsList={setReviewsList}
      />
    </div>
  );
}

export default Reviews;