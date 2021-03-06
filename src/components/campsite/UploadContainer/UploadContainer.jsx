import React, { useEffect, useState } from 'react';
import ReactCustomizableProgressbar from 'react-customizable-progressbar';
import "./UploadContainer.css";
import photoIcon from "../../../images/camera-icon.png";
import getImageName from '../logic/getImageName';

function UploadContainer({ 
  handleFileChange, handleUpload, progress, setModalOpen, displayComponent, uploadFile, setUploadFile, setComponent
}) {

  const [imgNames, setImgNames] = useState();

  useEffect(() => {
    if (uploadFile) {
      const names = getImageName(uploadFile);
      setImgNames(names);
    }
  }, [uploadFile]);

  const closeModal = (e) => {
    if (e.target.className === "upload-modal-bg" || e.target.className === "close-modal-button") {
      // Close modal & clear image file from state, display first component
      setModalOpen(false);
      setUploadFile(null);
      setComponent(0);
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
          onChange={handleFileChange}
          accept="image/x-png,image/jpeg"
          multiple
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
          </div>
        </label>
        {/* Render list of images to be uploaded */}
        <div className={
          (displayComponent === 1) ? "pre-upload-list" : "pre-upload-list hide"
        }>
          <ol>
            {
              (imgNames) ?
              imgNames.map(name => (
                <li>{name}</li>
              ))
              :
              <></>
            }
          </ol>
        </div>
        {/* Render 'Progress Bar' */}
        <ReactCustomizableProgressbar
          className={displayComponent === 2 ? "progress-bar" : "progress-bar hide"}
          progress={progress}
          radius={100}
          strokeColor="#63d418"
        >
          <span className="progress-num">{progress}%</span>
        </ReactCustomizableProgressbar>
        {
          (displayComponent !== 2) &&
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
        }
      </div>
    </div>
  );
}

export default UploadContainer;