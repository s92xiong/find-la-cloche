import React, { useState } from 'react';
import addReviewToFirestore from '../../logic/addReviewToFirestore';
import Page0 from './Page0';
import Page1 from './Page1';
import "./ModalReview.css";

function ModalReview({ match, item, modalOpen, setModalOpen, campsites, setReviewsList }) {
  // Highlight the "Next" button if all form fields are valid in the written review modal
  const [canContinue, setContinue] = useState(false);
  
  // eslint-disable-next-line no-unused-vars
  const [pageNum, setPageNum] = useState(0);

  // Initialize user string input in textarea
  const [userText, setUserText] = useState("");

  // Initialize user rating as an integer from 1 to 5, default is null
  const [rating, setRating] = useState(null);

  const [showSubmitButton, setShowSubmitButton] = useState(false);

  // User questions for 
  const [radioInputs, setRadioInputs] = useState({
    firepit: "",
    hammock: "",
    privacy: "",
    seating: "",
    thunderbox: "",
    water: "",
  });

  const defaultSettings = () => {
    // Reset state to its default setting
    setContinue(false);
    setUserText("");
    setRating(null);
    setModalOpen(false);
    setRadioInputs({});
    setPageNum(0);
    setShowSubmitButton(false);
  };

  const closeReviewModal = () => {
    defaultSettings();
  };
  
  // Handle textarea input change
  const handleChange = (e) => {
    if (e.target.value.length >= 1 && rating) {
      setContinue(true);
    } else if (e.target.value.length < 1) {
      setContinue(false);
    }
    setUserText(e.target.value);
  };

  const handleNextButton = () => (!canContinue) ? null : setPageNum(1);
  
  const handleBackButton = () => {
    setPageNum(0);
    setShowSubmitButton(false); // User must re-input radio buttons
  };

  // When user clicks on "Next" button, execute the following code
  const handleSubmit = () => {
    if (!showSubmitButton) return;
    addReviewToFirestore(match, campsites, rating, userText, setReviewsList, radioInputs);
    defaultSettings();
  };

  if (!modalOpen) return <></>
  return (
    <div className="review-modal-bg">
      <div className="review-modal-container">
        <div className="review-modal-top-section-container">
          <div className="close-modal-button" onClick={closeReviewModal}>✕</div>
          <h1 className="modal-title">{item.name}</h1>
        </div>
        {
          (pageNum === 0) ?
          <Page0
            rating={rating}
            setRating={setRating}
            userText={userText}
            setContinue={setContinue}
            handleChange={handleChange}
          />
          :
          <Page1
            setShowSubmitButton={setShowSubmitButton}
            handleSubmit={handleSubmit}
            setPageNum={setPageNum}
            radioInputs={radioInputs}
            setRadioInputs={setRadioInputs}
          />
        }
        {
          (pageNum === 0) ?
          <div className="review-button-container">
            <button 
              className={ (canContinue) ? "review-button" : "review-button-invalid" }
              onClick={handleNextButton}
            >
              Next
            </button>
          </div>
          :
          <div className="review-button-container">
            <button className="review-button-back" onClick={handleBackButton}>Back</button>
            {
              (showSubmitButton) ? 
              <button className="review-button" onClick={handleSubmit}>Submit</button>
              :
              <button className="review-button-invalid">Submit</button>
            }
          </div>
        }
      </div>
    </div>
  );
}

export default ModalReview;