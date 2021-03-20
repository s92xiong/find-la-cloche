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
          <p className="review-question">1. Spacing for tent:</p>
          <input onChange={handleChange} type="radio" id="smallCampsite" name="campsiteSpacing" value="small" className="radio-button"/>
          <label htmlFor="smallCampsite" className="radio-label">Small</label>
          <input onChange={handleChange} type="radio" id="medCampsite" name="campsiteSpacing" value="medium" className="radio-button"/>
          <label htmlFor="medCampsite" className="radio-label">Medium</label>
          <input onChange={handleChange} type="radio" id="largeCampsite" name="campsiteSpacing" value="large" className="radio-button"/>
          <label htmlFor="largeCampsite" className="radio-label">Large</label>
        </section>

        <section className="modal-question">
          <p className="review-question">2. Privacy:</p>
          <input onChange={handleChange} type="radio" id="privacyPoor" name="privacy" value="poor" className="radio-button"/>
          <label htmlFor="privacyPoor" className="radio-label">Poor</label>
          <input onChange={handleChange} type="radio" id="privacySatisfactory" name="privacy" value="satisfactory" className="radio-button"/>
          <label htmlFor="privacySatisfactory" className="radio-label">Satisfactory</label>
          <input onChange={handleChange} type="radio" id="privacyGood" name="privacy" value="good" className="radio-button"/>
          <label htmlFor="privacyGood" className="radio-label">Good</label>
        </section>

        <section className="modal-question">
          <p className="review-question">3. Wind exposure:</p>
          <input onChange={handleChange} type="radio" id="windLow" name="wind" value="low" className="radio-button"/>
          <label htmlFor="windLow" className="radio-label">Low</label>
          <input onChange={handleChange} type="radio" id="windMed" name="wind" value="medium" className="radio-button"/>
          <label htmlFor="windMed" className="radio-label">Normal</label>
          <input onChange={handleChange} type="radio" id="windHigh" name="wind" value="high" className="radio-button"/>
          <label htmlFor="windHigh" className="radio-label">High</label>
        </section>

        <section className="modal-question">
          <p className="review-question">4. Thunderbox:</p>
          <input onChange={handleChange} type="radio" id="thunderboxYes" name="thunderbox" value="yes" className="radio-button"/>
          <label htmlFor="thunderboxYes" className="radio-label">Yes</label>
          <input onChange={handleChange} type="radio" id="thunderboxNo" name="thunderbox" value="no" className="radio-button"/>
          <label htmlFor="thunderboxNo" className="radio-label">No</label>
        </section>

        <section className="modal-question">
          <p className="review-question">5. Access to water:</p>
          <input onChange={handleChange} type="radio" id="waterYes" name="water" value="yes" className="radio-button"/>
          <label htmlFor="waterYes" className="radio-label">Yes</label>
          <input onChange={handleChange} type="radio" id="waterNo" name="water" value="no" className="radio-button"/>
          <label htmlFor="waterNo" className="radio-label">No</label>
        </section>

        <section className="modal-question">
          <p className="review-question">6. Firepit:</p>
          <input onChange={handleChange} type="radio" id="firepitYes" name="firepit" value="yes" className="radio-button"/>
          <label htmlFor="firepitYes" className="radio-label">Yes</label>
          <input onChange={handleChange} type="radio" id="firepitNo" name="firepit" value="no" className="radio-button"/>
          <label htmlFor="firepitNo" className="radio-label">No</label>
        </section>

        <section className="modal-question">
          <p className="review-question">7. Campsite seating:</p>
          <input onChange={handleChange} type="radio" id="seatingYes" name="seating" value="yes" className="radio-button"/>
          <label htmlFor="seatingYes" className="radio-label">Yes</label>
          <input onChange={handleChange} type="radio" id="seatingNo" name="seating" value="no" className="radio-button"/>
          <label htmlFor="seatingNo" className="radio-label">No</label>
        </section>

        <section className="modal-question">
          <p className="review-question">8. Hammock friendly:</p>
          <input onChange={handleChange} type="radio" id="hammockYes" name="hammock" value="yes" className="radio-button"/>
          <label htmlFor="hammockYes" className="radio-label">Yes</label>
          <input onChange={handleChange} type="radio" id="hammockNo" name="hammock" value="no" className="radio-button"/>
          <label htmlFor="hammockNo" className="radio-label">No</label>
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