import React, { useEffect, useState } from 'react';
import ReviewsList from './ReviewsList';
import "./styles/Reviews.css";
import WriteReview from './WriteReview';
import getReviews from "../logic/getReviews";

function Reviews({ item, match, campsites }) {

  const [modalOpen, setModalOpen] = useState(false);
  const [reviewsList, setReviewsList] = useState(null);

  useEffect(() => {
    getReviews(match, reviewsList, setReviewsList);
  }, [match, reviewsList]);

  return (
    <div className="reviews-container">
      <div className="write-review-button-container">
        {
          (!reviewsList) ?
          <div className="no-reviews">
            <h2>There are currently no reviews.</h2>
            <p>Be the first person to review this campsite!</p>
          </div>
          :
          <div className="add-review-message">
            <h2>Have you stayed at this campsite?</h2>
            <p>Leave a review and help out your fellow hikers and backpackers.</p>
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
      />
    </div>
  );
}

export default Reviews;