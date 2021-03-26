import React, { useEffect, useState } from 'react';
import ReactCustomizableProgressbar from 'react-customizable-progressbar';
import photoIcon from "../../../images/camera-icon.png";
import getImageName from '../logic/getImageName';
import "./ModalPhoto.css";

function ModalPhoto({ 
  handleFileChange, handleUpload, progress, setModalOpen, currentPage, 
  filesArray, setFilesArray, setComponent, stopModalClose
}) {

  const [imgNames, setImgNames] = useState();

  useEffect(() => {
    if (filesArray) {
      const names = getImageName(filesArray);
      setImgNames(names);
    }
  }, [filesArray]);

  const closeModal = (e) => {
    // Prevent the modal from closing if an upload is occuring
    if (stopModalClose) return;
    // Close the modal if the target is the x button or outside of the modal
    if (e.target.className === "upload-modal-bg" || e.target.className === "close-modal-button") {
      // Close modal & clear image file from state, display first component
      setModalOpen(false);
      setFilesArray(null);
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
          id="selectPhoto"
          type="file" 
          onChange={handleFileChange}
          accept="image/x-png,image/jpeg"
          multiple
        />
        {/* Render 'Click to add a Photo' */}
        <label
          htmlFor="selectPhoto" 
          className={(currentPage === 0) ? "label-select-photo" : "label-select-photo hide"}
        >
          <div className="label-container">
            <div className="icon-bg">
              <img src={photoIcon} alt=""/>
            </div>
            <h4>Click to add a photo</h4>
            <p>PNG or JPG</p>
          </div>
        </label>
        {/* Render list of images to be uploaded */}
        <div className={ (currentPage === 1) ? "pre-upload-list" : "pre-upload-list hide" }>
          {
            (imgNames) ?
            imgNames.map(name => (
              <div className="pre-upload-image-container">
                <span>{name}</span>
              </div>
            ))
            :
            <></>
          }
        </div>
        <ReactCustomizableProgressbar
          className={currentPage === 2 ? "progress-bar" : "progress-bar hide"}
          progress={progress}
          radius={100}
          strokeColor="#63d418"
        >
          <span className="progress-num">{progress}%</span>
        </ReactCustomizableProgressbar>
        {
          (currentPage !== 2) &&
          <div className="upload-button-container">
            <button 
              onClick={handleUpload}
              className={ (filesArray) ? "uploader-button" : "uploader-button-no-file" }
            >
              Upload
            </button>
          </div>
        }
      </div>
    </div>
  );
}

export default ModalPhoto;