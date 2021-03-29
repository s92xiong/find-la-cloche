import React from 'react';

function Page1({ radioInputs, setRadioInputs, setShowSubmitButton }) {

  const handleChange = (e) => {
    setRadioInputs({...radioInputs, [e.target.name]: e.target.value});
    
    // Check if all buttons are checked, if they are, then allow user to submit form
    const radioButtons = Array.from(document.querySelectorAll(".radio-button"));
    let sum = 0;
    radioButtons.forEach(button => (button.checked) ? sum++ : null);
    if (sum >= 7) setShowSubmitButton(true);
  };

  return (
    <div className="review-modal-1">
      <form className="modal-questions-form">
        <section className="modal-question">
          <p className="review-question">1. Firepit:</p>
          <input onChange={handleChange} type="radio" id="firepitYes" name="firepit" value="Yes" className="radio-button"/>
          <label htmlFor="firepitYes" className="radio-label">Yes</label>
          <input onChange={handleChange} type="radio" id="firepitNo" name="firepit" value="No" className="radio-button"/>
          <label htmlFor="firepitNo" className="radio-label">No</label>
        </section>
        <section className="modal-question">
          <p className="review-question">2. Campsite seating:</p>
          <input onChange={handleChange} type="radio" id="seatingYes" name="seating" value="Yes" className="radio-button"/>
          <label htmlFor="seatingYes" className="radio-label">Yes</label>
          <input onChange={handleChange} type="radio" id="seatingNo" name="seating" value="No" className="radio-button"/>
          <label htmlFor="seatingNo" className="radio-label">No</label>
        </section>
        <section className="modal-question">
          <p className="review-question">3. Hammock friendly:</p>
          <input onChange={handleChange} type="radio" id="hammockYes" name="hammock" value="Yes" className="radio-button"/>
          <label htmlFor="hammockYes" className="radio-label">Yes</label>
          <input onChange={handleChange} type="radio" id="hammockNo" name="hammock" value="No" className="radio-button"/>
          <label htmlFor="hammockNo" className="radio-label">No</label>
        </section>
        <section className="modal-question">
          <p className="review-question">4. Thunderbox:</p>
          <input onChange={handleChange} type="radio" id="thunderboxYes" name="thunderbox" value="Yes" className="radio-button"/>
          <label htmlFor="thunderboxYes" className="radio-label">Yes</label>
          <input onChange={handleChange} type="radio" id="thunderboxNo" name="thunderbox" value="No" className="radio-button"/>
          <label htmlFor="thunderboxNo" className="radio-label">No</label>
        </section>
        <section className="modal-question">
          <p className="review-question">5. Access to water:</p>
          <input onChange={handleChange} type="radio" id="waterYes" name="water" value="Yes" className="radio-button"/>
          <label htmlFor="waterYes" className="radio-label">Yes</label>
          <input onChange={handleChange} type="radio" id="waterNo" name="water" value="No" className="radio-button"/>
          <label htmlFor="waterNo" className="radio-label">No</label>
        </section>
        <section className="modal-question">
          <p className="review-question">6. Privacy:</p>
          <input onChange={handleChange} type="radio" id="privacySat" name="privacy" value="Satisfactory" className="radio-button"/>
          <label htmlFor="privacySat" className="radio-label">Satisfactory</label>
          <input onChange={handleChange} type="radio" id="privacyGood" name="privacy" value="Good" className="radio-button"/>
          <label htmlFor="privacyGood" className="radio-label">Good</label>
          <input onChange={handleChange} type="radio" id="privacyVeryGood" name="privacy" value="Very Good" className="radio-button"/>
          <label htmlFor="privacyVeryGood" className="radio-label">Very Good</label>
        </section>
        <section className="modal-question">
          <p className="review-question">7. Spacing for multiple tents:</p>
          <input onChange={handleChange} type="radio" id="spacingSat" name="tentSpacing" value="Satisfactory" className="radio-button"/>
          <label htmlFor="spacingSat" className="radio-label">Satisfactory</label>
          <input onChange={handleChange} type="radio" id="spacingGood" name="tentSpacing" value="Good" className="radio-button"/>
          <label htmlFor="spacingGood" className="radio-label">Good</label>
          <input onChange={handleChange} type="radio" id="spacingVeryGood" name="tentSpacing" value="Very Good" className="radio-button"/>
          <label htmlFor="spacingVeryGood" className="radio-label">Very Good</label>
        </section>
      </form>
    </div>
  );
}

export default Page1;