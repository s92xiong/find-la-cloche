import React from 'react';
import ReactCustomizableProgressbar from 'react-customizable-progressbar';
import "./UploadContainer.css";
import photoIcon from "../../../images/camera-icon.png";

function UploadContainer({ 
  handleChange, handleUpload, progress, setModalOpen, displayComponent, uploadFile
}) {

  const closeModal = (e) => {
    // console.log(e.target.className);
    if (e.target.className === "upload-modal-bg" || e.target.className === "close-modal-button") {
      setModalOpen(false);
    }
  };

  return (
    <div className="upload-modal-bg" onClick={closeModal}>
      <div className="upload-modal">
        <div className="close-modal-button">✕</div>
        <h1>Upload photos</h1>
        <input 
          className="uploader-input"
          id="select-photo"
          type="file" 
          onChange={handleChange}
          accept="image/x-png,image/jpeg" 
        />
        {/* Render 'Click to add a Photo' */}
        <label htmlFor="select-photo" className={
          (displayComponent === 0) ? "label-select-photo" : "label-select-photo hide"
        }>
          <div className="label-container">
            <div className="icon-bg">
              <img src={photoIcon} alt=""/>
            </div>
            <h4>Click to add a photo</h4>
            <p>PNG or JPG</p>
            {
              (uploadFile) ? 
              <span className="file-name">{uploadFile.name}</span>
              : 
              <></>
            }
          </div>
        </label>
        {/* Render 'Progress Bar' */}
        <ReactCustomizableProgressbar
          className={displayComponent === 2 ? "progress-bar" : "progress-bar hide"}
          progress={progress}
          radius={100}
          strokeColor="#63d418"
        >
          <span className="progress-num">{progress}%</span>
        </ReactCustomizableProgressbar>
        <div className="upload-button-container">
          <button 
            onClick={handleUpload}
            className={ 
              (uploadFile) ? "uploader-button" : "uploader-button-no-file"
              // (displayComponent === 0) ? "uploader-button" : "uploader-button hide" 
            }
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadContainer;