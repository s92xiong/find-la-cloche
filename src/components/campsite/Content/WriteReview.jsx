import React from 'react';
import { FaStar } from 'react-icons/fa';
import "./styles/WriteReview.css";

function WriteReview({ item, modalOpen, setModalOpen }) {

  const closeModal = (e) => (e.target.className === "write-review-modal-bg") && setModalOpen(false);

  if (!modalOpen) return <></>
  return (
    <div className="write-review-modal-bg" onClick={closeModal}>
      <div className="write-review-modal">
        <div 
          className="close-review-modal"
          onClick={() => setModalOpen(false)}
        >
          ✕
        </div>
        <h1>{item.name}</h1>
        <div className="five-star-rating">
          {
            // Temporary star location
            [...Array(5)].map((star, i) => <FaStar key={i} size={35} className="campsite-stars" />)
          }
        </div>
      </div>
    </div>
  );
}

export default WriteReview;