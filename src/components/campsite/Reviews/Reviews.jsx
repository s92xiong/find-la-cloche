import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase';
import ReviewsList from './ReviewsList';
import "./styles/Reviews.css";
import ModalReview from '../ModalReview/ModalReview';
import { hideContainer } from '../logic/showHideContainer';

function Reviews({ item, setItem, match, userData }) {

  // Check if user is logged in
  const [user] = useAuthState(auth);

  // Render a error message if unauthorized user tries to upload photos
  const [errorMessage, setErrorMessage] = useState(false);

  // Check if modal is open or not
  const [modalOpen, setModalOpen] = useState(false);

  const openReviewModal = () => {
    if (!user) return setErrorMessage(true);
    hideContainer();
    setModalOpen(true);
  };

  useEffect(() => {
    if (errorMessage) setTimeout(() => setErrorMessage(false), 3000);
  });

  if (!item) return <></>;
  return (
    <div className="reviews-container">
      <div className="write-review-button-container">
        {
          (item.reviews.length < 1) ?
          <div className="no-reviews">
            <h2>There are currently no reviews</h2>
            <p>Be the first person to review this campsite!</p>
          </div>
          :
          <div className="add-review-message">
            <h2>Reviews ({item.reviews.length})</h2>
            <p>Help your fellow backpackers by adding a review.</p>
          </div>
        }
        <div>
          <button className="review-button" onClick={openReviewModal}>
            Write review
            {
              (errorMessage) ?
              <span className="upload-error upload-error-review">You must be logged in</span> : <></>
            }
          </button>
        </div>
      </div>
      <ReviewsList
        match={match}
        item={item}
        setItem={setItem}
        setModalOpen={setModalOpen}
      />
      <ModalReview
        match={match}
        item={item}
        setItem={setItem}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        userData={userData}
      />
    </div>
  );
}

export default Reviews;