import React from 'react';

function CloseModal({ setModalOpen }) {
  return (
    <div 
      className="close-review-modal"
      onClick={() => setModalOpen(false)}
    >
      ✕
    </div>
  );
}

export default CloseModal;