import React from 'react';
import ReactCustomizableProgressbar from 'react-customizable-progressbar';
import "./UploadContainer.css";

function UploadContainer({ handleChange, handleUpload, progress, setModalOpen }) {

  const closeModal = (e) => {
    if (e.target.className === "upload-modal-bg" || "close-modal-button") {
      setModalOpen(false);
    }
  };

  return (
    <div className="upload-modal-bg" onClick={closeModal}>
      <div className="upload-modal">
        <div className="close-modal-button">✕</div>
        <h1>Upload photos</h1>
        <input className="uploader-input" type="file" onChange={handleChange}/>
        <button className="uploader-button" onClick={handleUpload}>Upload File</button>
        <ReactCustomizableProgressbar
          className="progress-bar"
          progress={progress}
          radius={100}
          strokeColor="#63d418"
        >
          <span className="progress-num">{progress}%</span>
        </ReactCustomizableProgressbar>
      </div>
    </div>
  );
}

export default UploadContainer;