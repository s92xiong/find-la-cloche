import React, { useState } from 'react';
import ReviewsList from './ReviewsList';
import "./styles/Reviews.css";
import WriteReview from './WriteReview';

function Reviews({ item, match, campsites, reviewsList, setReviewsList }) {

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="reviews-container">
      <div className="write-review-button-container">
        {
          (reviewsList.length === 0) ?
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
        <button className="review-button" onClick={() => setModalOpen(true)}>Write review</button>
      </div>
      <ReviewsList
        reviewsList={reviewsList}
      />
      <WriteReview
        match={match}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        item={item}
        campsites={campsites}
        setReviewsList={setReviewsList}
      />
    </div>
  );
}

export default Reviews;