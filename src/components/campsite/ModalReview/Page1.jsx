import React from 'react';

function Page1({ radioInputs, setRadioInputs, setShowSubmitButton }) {

  const handleChange = (e) => {
    setRadioInputs({...radioInputs, [e.target.name]: e.target.value});
    
    // Check if all buttons are checked, if they are, then allow user to submit form
    const radioButtons = Array.from(document.querySelectorAll(".radio-button"));
    let sum = 0;
    radioButtons.forEach(button => (button.checked) ? sum++ : null);
    if (sum >= 6) setShowSubmitButton(true);
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
          <p className="review-question">2. Tent pad:</p>
          <input onChange={handleChange} type="radio" id="tentpadYes" name="tentpad" value="Yes" className="radio-button"/>
          <label htmlFor="tentpadYes" className="radio-label">Yes</label>
          <input onChange={handleChange} type="radio" id="tentpadNo" name="tentpad" value="No" className="radio-button"/>
          <label htmlFor="tentpadNo" className="radio-label">No</label>
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
          <p className="review-question">5. Water quality:</p>
          <input onChange={handleChange} type="radio" id="dirtyWater" name="water" value="Dirty" className="radio-button"/>
          <label htmlFor="dirtyWater" className="radio-label">Dirty</label>
          <input onChange={handleChange} type="radio" id="filterable" name="water" value="Filterable" className="radio-button"/>
          <label htmlFor="filterable" className="radio-label">Filterable</label>
          <input onChange={handleChange} type="radio" id="veryClean" name="water" value="Very clean" className="radio-button"/>
          <label htmlFor="veryClean" className="radio-label">Very clean</label>
        </section>
        <section className="modal-question">
          <p className="review-question">6. Privacy:</p>
          <input onChange={handleChange} type="radio" id="privacySat" name="privacy" value="Satisfactory" className="radio-button"/>
          <label htmlFor="privacySat" className="radio-label">Satisfactory</label>
          <input onChange={handleChange} type="radio" id="privacyGood" name="privacy" value="Good" className="radio-button"/>
          <label htmlFor="privacyGood" className="radio-label">Good</label>
          <input onChange={handleChange} type="radio" id="privacyVeryGood" name="privacy" value="Very good" className="radio-button"/>
          <label htmlFor="privacyVeryGood" className="radio-label">Very Good</label>
        </section>
      </form>
    </div>
  );
}

export default Page1;