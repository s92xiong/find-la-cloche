import React from 'react';
import ReactCustomizableProgressbar from 'react-customizable-progressbar';
import "./UploadContainer.css";

function UploadContainer({ handleChange, handleUpload, progress, setModalOpen }) {

  const closeModal = (e) => {
    console.log(e.target.className);
    if (e.target.className === "upload-modal") {
      setModalOpen(false);
    }
  };

  return (
    <div className="upload-modal" onClick={closeModal}>
      <div className="upload-image">
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