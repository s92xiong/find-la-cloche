import React, { useState } from 'react';
import ReviewsList from './ReviewsList';
import "./styles/Reviews.css";
import WriteReview from './WriteReview';

function Reviews({ item, match, campsites }) {

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <div className="reviews-container">
      <div className="write-review-button-container">
        <button className="review-button" onClick={openModal}>Write review</button>
      </div>
      <ReviewsList
        match={match}
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