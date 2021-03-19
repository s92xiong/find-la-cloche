import React from 'react'
import CloseModal from './CloseModal';

function ModalPage1({ setModalOpen, item, canContinue, handleSubmit }) {
  return (
    <div className="write-review-modal-1">
      <CloseModal setModalOpen={setModalOpen} />
      <h1 className="modal-title">{item.name}</h1>
      <div className="modal-questions"></div>
      <div className="review-button-container">
          <button 
            className={ (canContinue) ? "review-button-next" : "review-button-invalid" }
            onClick={handleSubmit}
          >
            Next
          </button>
        </div>
    </div>
  );
}

export default ModalPage1;