import React, { useState } from 'react';
import addReviewToFirestore from '../logic/addReviewToFirestore';
import ModalPage0 from './ModalPage0';
import ModalPage1 from './ModalPage1';
import "./styles/WriteReview.css";

function WriteReview({ match, item, modalOpen, setModalOpen, campsites, setReviewsList }) {
  // Highlight the "Next" button if all form fields are valid in the written review modal
  const [canContinue, setContinue] = useState(false);
  
  // eslint-disable-next-line no-unused-vars
  const [pageNum, setPageNum] = useState(0);

  // Initialize user string input in textarea
  const [userText, setUserText] = useState("");

  // Initialize user rating as an integer from 1 to 5, default is null
  const [rating, setRating] = useState(null);
  
  // Handle textarea input change
  const handleChange = (e) => {
    if (e.target.value.length >= 1 && rating) {
      setContinue(true);
    } else if (e.target.value.length < 1) {
      setContinue(false);
    }
    setUserText(e.target.value);
  };

  const handleNext = () => {
    if (!canContinue) return;
    console.log("Next button clicked");
    setPageNum(1);
  };

  // When user clicks on "Next" button, execute the following code
  const submitReview = () => {
    if (!canContinue) return;
    addReviewToFirestore(match, campsites, rating, userText, setReviewsList);
    // Reset state to its default setting
    setContinue(false);
    setUserText("");
    setRating(null);
    setModalOpen(false);
  };

  if (!modalOpen) return <></>
  return (
    <div className="write-review-modal-bg">
      <div className="write-review-modal">
        {
          (pageNum === 0) ?
          <ModalPage0
            setModalOpen={setModalOpen}
            item={item}
            rating={rating}
            setRating={setRating}
            userText={userText}
            setContinue={setContinue}
            handleChange={handleChange}
            canContinue={canContinue}
            handleNext={handleNext}
          />
          :
          <ModalPage1 
            item={item}
            setModalOpen={setModalOpen}
            canContinue={canContinue}
            handleSubmit={submitReview}
          />
        }
      </div>
    </div>
  );
}

export default WriteReview;