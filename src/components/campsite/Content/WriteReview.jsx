import React, { useState } from 'react';
import StarRating from './StarRating';
import "./styles/WriteReview.css";

function WriteReview({ item, modalOpen, setModalOpen }) {

  const text = "Give back to the community. Share your thoughts about this campsite so others know what to expect.";
  const closeModal = (e) => (e.target.className === "write-review-modal-bg") && setModalOpen(false);

  const [canContinue, setContinue] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(null);

  const handleChange = (e) => {
    if (e.target.value.length > 0) {
      setContinue(true);
    } else if (e.target.value.length === 0) {
      setContinue(false);
    }
    setReviewText(e.target.value);
  };

  const handleNext = () => {
    console.log(reviewText);
  };

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
          <StarRating rating={rating} setRating={setRating} />
          <div className="text-box-container">
            <textarea 
              placeholder={text}
              name="review-text-box"
              id="reviewBox"
              className="review-text-box"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="review-button-container">
            <button 
              className={ (canContinue) ? "review-button-next" : "review-button-invalid" }
              onClick={handleNext}
            >Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WriteReview;