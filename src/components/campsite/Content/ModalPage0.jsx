import React from 'react';
import CloseModal from './CloseModal';
import StarRating from './StarRating';

function ModalPage0({ 
  setModalOpen, item, rating, setRating, userText, 
  setContinue, handleChange, canContinue, handleNext
}) {
  
  const placeholderText = "Give back to the community. Share your thoughts about this campsite so others know what to expect.";

  return (
    <div className="write-review-modal-0">
      <CloseModal setModalOpen={setModalOpen} />
      <h1 className="modal-title">{item.name}</h1>
      <div className="five-star-rating">
        <StarRating
          rating={rating}
          setRating={setRating}
          userText={userText}
          setContinue={setContinue}
        />
        <div className="text-box-container">
          <textarea 
            placeholder={placeholderText}
            name="review-text-box"
            id="reviewBox"
            className="review-text-box"
            onChange={handleChange}
            maxlength="8000"
            value={userText}
          ></textarea>
        </div>
        <div className="review-button-container">
          <button 
            className={ (canContinue) ? "review-button" : "review-button-invalid" }
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalPage0;