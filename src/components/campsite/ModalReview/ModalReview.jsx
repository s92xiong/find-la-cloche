import React, { useEffect, useState } from 'react';
import addReviewToFirestore from '../logic/addReviewToFirestore';
import Page0 from './Page0';
import Page1 from './Page1';
import "./ModalReview.css";
import { showContainer } from '../logic/showHideContainer';

function ModalReview({ match, item, setItem, modalOpen, setModalOpen, userData }) {
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
    firepit: undefined,
    hammock: undefined,
    privacy: undefined,
    tentpad: undefined,
    thunderbox: undefined,
    water: undefined,
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
    showContainer();
  };

  // If user closes modal before submitting a review, reset values back to default settings
  const closeReviewModal = () => defaultSettings();

  // Execute event handler when user clicks on any the 5 stars
  const handleRating = (ratingValue) => {
    const handler = () => {
      // Activate/highlight the "Next" button so the user can proceed to the next page
      (userText.length >= 1) && setContinue(true);
      return setRating(Number(ratingValue));
    };
    return handler;
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
    addReviewToFirestore(match, item, setItem, rating, userText, radioInputs, userData);
    defaultSettings();
  };

  const pressEsc = (e) => (e.key === "Escape") && closeReviewModal();
  
  useEffect(() => {
    document.addEventListener("keydown", pressEsc);
    return () => document.removeEventListener("keydown", pressEsc)
  });

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
            userText={userText}
            handleRating={handleRating}
            handleChange={handleChange}
          />
          :
          <Page1
            radioInputs={radioInputs}
            setRadioInputs={setRadioInputs}
            setShowSubmitButton={setShowSubmitButton}
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