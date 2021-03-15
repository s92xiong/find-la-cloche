import React, { useState } from 'react';
import addReviewToFirestore from '../logic/addReviewToFirestore';
import StarRating from './StarRating';
import "./styles/WriteReview.css";

function WriteReview({ match, item, modalOpen, setModalOpen, campsites }) {

  const placeholderText = "Give back to the community. Share your thoughts about this campsite so others know what to expect.";
  
  // Highlight the "Next" button if all form fields are valid in the written review modal
  const [canContinue, setContinue] = useState(false);

  // Initialize user string input in textarea
  const [userText, setUserText] = useState("");

  // Initialize user rating as an integer from 1 to 5, default is null
  const [rating, setRating] = useState(null);
  
  // Close modal if the user clicks outside of the modal (or the "✕" button)
  const closeModal = (e) => (e.target.className === "write-review-modal-bg") && setModalOpen(false);
  
  // Handle textarea input change
  const handleChange = (e) => {
    if (e.target.value.length >= 1 && rating) {
      setContinue(true);
    } else if (e.target.value.length < 1) {
      setContinue(false);
    }
    setUserText(e.target.value);
  };

  // When user clicks on "Next" button, execute the following code
  const handleNext = () => {
    if (!canContinue) return console.log("You must fill in all the required form fields!");
    console.log("All form fields are valid!");
    addReviewToFirestore(match, campsites, rating, userText);
    // Reset state to default after adding data to Firestore
    setContinue(false);
    setUserText("");
    setRating(null);
    // Close modal
    setModalOpen(false);
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