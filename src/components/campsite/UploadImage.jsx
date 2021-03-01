import React from 'react';
import ReactCustomizableProgressbar from 'react-customizable-progressbar';
import "./styles/UploadImage.css";

function UploadImage({ handleChange, handleUpload, progress }) {
  return (
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
  );
}

export default UploadImage;