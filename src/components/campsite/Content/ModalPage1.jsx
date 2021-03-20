import React from 'react'
import CloseModal from './CloseModal';

function ModalPage1({ setModalOpen, item, canContinue, handleSubmit, setPageNum, radioInputs, setRadioInputs }) {

  const handleChange = (e) => setRadioInputs({...radioInputs, [e.target.name]: e.target.value});

  return (
    <div className="write-review-modal-1">
      <CloseModal setModalOpen={setModalOpen} />
      <h1 className="modal-title">{item.name}</h1>
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
      </form>
      <div className="review-button-container">
        <button 
          className="review-button-back"
          onClick={ () => setPageNum(0)}
        >
          Back
        </button>
        <button 
          className={ (canContinue) ? "review-button" : "review-button-invalid" }
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default ModalPage1;