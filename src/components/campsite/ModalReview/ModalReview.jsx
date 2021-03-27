import React, { useState } from 'react';
import addReviewToFirestore from '../logic/addReviewToFirestore';
import Page0 from './Page0';
import Page1 from './Page1';
import "./ModalReview.css";

function ModalReview({ match, item, modalOpen, setModalOpen, campsites, setReviewsList }) {
  // Highlight the "Next" button if all form fields are valid in the 1st page of the modal
  const [canContinue, setContinue] = useState(false);
  
  // Track which page user is on (2 pages total)
  const [pageNum, setPageNum] = useState(0);

  // Textarea value
  const [userText, setUserText] = useState("");

  // Campsite rating, ranging from 1 to 5 stars
  const [rating, setRating] = useState(null);

  // Prevent submitting review if the form fields haven't been fully completed
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  // Questions to ask the user about the campsite, string values
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

  // If user closes modal before submitting a review, reset values back to default settings
  const closeReviewModal = () => defaultSettings();
  
  // Handle textarea input change
  const handleChange = (e) => {
    if (e.target.value.length >= 1 && rating) {
      setContinue(true);
    } else if (e.target.value.length < 1) {
      setContinue(false);
    }
    setUserText(e.target.value);
  };

  // Move onto the 2nd page (index 1) if canContinue is true
  const handleNextButton = () => (!canContinue) ? null : setPageNum(1);
  
  // Go back to the 1st page
  const handleBackButton = () => {
    setPageNum(0);
    setRadioInputs({});
    setShowSubmitButton(false); // User must re-input radio buttons
  };

  const handleSubmit = () => {
    if (!showSubmitButton) return console.log("Fill in all form fields in order to submit review!");
    addReviewToFirestore(match, item, rating, userText, setReviewsList, radioInputs);
    defaultSettings();
  };

  if (!modalOpen) return <></>
  return (
    <div className="review-modal-bg">
      <div className="review-modal-container">
        <div className="review-modal-top-section-container">
          <div className="close-modal-button" onClick={closeReviewModal}>✕</div>
          <h1 className="modal-title">{(item) && item.name}</h1>
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