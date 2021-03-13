import React, { useState } from 'react';
import "./styles/Reviews.css";
import WriteReview from './WriteReview';

function Reviews({ item, match, campsites }) {

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <div className="reviews-container">
      <button onClick={openModal}>Write review</button>
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