import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase';
import "./styles/Photos.css";
import uploadImage from "../logic/uploadImage";
import UploadContainer from "../UploadContainer/UploadContainer";

function Photos({ imgURLs, campsites, match }) {

  const [user] = useAuthState(auth);
  const [uploadLoginError, setUploadLoginError] = useState(false);

  // File information for upload
  const [uploadFile, setUploadFile] = useState(null);

  // Show progress as upload occurs
  const [progress, setProgress] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    if (!user) return setUploadLoginError(true);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    // Update file state when a new file is selected
    setUploadFile(e.target.files[0]);
  };

  const handleUpload = () => {
    return uploadImage(match, uploadFile, campsites, setProgress);
  };

  useEffect(() => {
    if (uploadLoginError) {
      // Remove error message after 3 seconds
      setTimeout(() => setUploadLoginError(false), 3000);
    }
  }, [uploadLoginError]);

  return (
    <div className="photos-container">
      <div className="add-photos">
        <div className="add-photos-label">
          <h2>Add photos of this campsite</h2>
          <p>Photos help others preview the campsite. Upload photos about this campsite to inspire others.</p>
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
          handleChange={handleChange}
          handleUpload={handleUpload}
          progress={progress}
          setModalOpen={setModalOpen}
        />
        :
        <></>
      }
    </div>
  );
}

export default Photos;