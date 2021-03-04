import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase';
import "./styles/Photos.css";

function Photos({ imgURLs }) {

  const [user] = useAuthState(auth);
  const [uploadLoginError, setUploadLoginError] = useState(false);

  const handleClick = () => {
    if (!user) return setUploadLoginError(true);

    console.log("You are logged in and permitted to upload photos!");
  };

  useEffect(() => {
    if (uploadLoginError) {
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
    </div>
  );
}

export default Photos;