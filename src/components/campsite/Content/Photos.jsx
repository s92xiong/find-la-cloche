import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase';
import "./styles/Photos.css";
import uploadImage from "../logic/uploadImage";
import UploadContainer from "../UploadContainer/UploadContainer";

function Photos({ imgURLs, campsites, match }) {

  // Check if user is logged in
  const [user] = useAuthState(auth);

  // Render a message error if unauthorized user tries to upload photos
  const [uploadLoginError, setUploadLoginError] = useState(false);

  // File information for upload
  const [filesArray, setFilesArray] = useState(null);

  // Show progress as upload occurs
  const [progress, setProgress] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);

  // Render 3 different components (0, 1, 2)
  const [displayComponent, setComponent] = useState(0);

  // Prevent UploadContainer modal from closing when upload progress is occuring
  const [stopModalClose, setStopModalClose] = useState(false);

  const handleClick = () => {
    if (!user) return setUploadLoginError(true);
    setModalOpen(true);
  };

  const handleFileChange = (e) => {
    // Update file state when a new set of files or file is selected
    setFilesArray(e.target.files);
    setComponent(1);
  };

  const handleUpload = () => {
    setComponent(2);
    return uploadImage(
      match, filesArray, setFilesArray, campsites, setProgress, setModalOpen, setComponent, setStopModalClose
    );
  };

  useEffect(() => {
    if (uploadLoginError) {
      // Remove error message after 3 seconds
      setTimeout(() => setUploadLoginError(false), 3000);
    }
  }, [uploadLoginError, filesArray, imgURLs]);

  return (
    <div className="photos-container">
      <div className="add-photos">
        <div className="add-photos-label">
          {
            (imgURLs.length > 1) ? <h2>Add photos of this campsite</h2> : <h2>There are currently no photos of this campsite!</h2>
          }
          {
            (imgURLs.length > 1) ? <p>Photos help others preview the campsite. Upload photos about this campsite to inspire others.</p> :
            <p>Be the first user to post photos of this campsite!</p>
          }
        </div>
        <div className="upload-photos-container">
          <button onClick={handleClick} className="upload-photos-button">Upload photos</button>
          {
            (uploadLoginError) ? <span className="upload-error">You must be logged in.</span> : <></>
          }
        </div>
      </div>
      <div className="line-separator"></div>
      <div className="photos-items-container">
        {
          imgURLs.map((url, i) => {
            return (
              <div className="photo-item" key={i}>
                <img src={url.urlString} alt=""/>
              </div>
            );
          })
        }
      </div>
      {
        (modalOpen) ?
        <UploadContainer
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
          uploadFile={filesArray}
          progress={progress}
          setModalOpen={setModalOpen}
          displayComponent={displayComponent}
          setUploadFile={setFilesArray}
          setComponent={setComponent}
          stopModalClose={stopModalClose}
        />
        :
        <></>
      }
    </div>
  );
}

export default Photos;