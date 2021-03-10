import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase';
import "./styles/Photos.css";
import uploadImage from "../logic/uploadImage";
import UploadContainer from "../UploadContainer/UploadContainer";
import Carousel from '../Carousel/Carousel';

function Photos({ imgURLs, setImgURLs, campsites, match }) {

  // Check if user is logged in
  const [user] = useAuthState(auth);

  // Render a message error if unauthorized user tries to upload photos
  const [uploadLoginError, setUploadLoginError] = useState(false);

  // File information for upload
  const [filesArray, setFilesArray] = useState(null);

  // Show progress as upload occurs
  const [progress, setProgress] = useState(0);

  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  // Render 3 different components (0, 1, 2)
  const [displayComponent, setComponent] = useState(0);

  // Prevent UploadContainer modal from closing when upload progress is occuring
  const [stopModalClose, setStopModalClose] = useState(false);

  // Initialize number to keep track of which img should be displayed in the carousel
  const [imgIndex, setImgIndex] = useState();

  const [isCarouselOpen, setCarouselOpen] = useState(false);

  const handleClick = () => {
    if (!user) return setUploadLoginError(true);
    setUploadModalOpen(true);
  };

  const handleFileChange = (e) => {
    // Update file state when a new set of files or file is selected
    setFilesArray(e.target.files);
    setComponent(1);
  };

  const handleUpload = () => {
    setComponent(2);
    return uploadImage(
      match, filesArray, setFilesArray, campsites, setProgress, 
      setUploadModalOpen, setComponent, setStopModalClose
    );
  };

  const openCarousel = (e) => {
    // Open specific img clicked on using data attribute
    const index = Number(e.target.dataset.id);

    // Set the index to the img clicked on
    setImgIndex(index);

    // Copy and update imgURL state
    const array = [...imgURLs];
    array.forEach(item => (item.display) ? item.display = false : null);
    array[index].display = true;
    setImgURLs(array);

    // Open carousel
    setCarouselOpen(true);

    // Hide scroll bar, get access to a document, then update it
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
        {/* DISPLAY ALL IMAGES OF THE CAMPSITE */}
        {
          imgURLs.map((url, i) => {
            return (
              <div className="photo-item" key={i}>
                <img data-id={i} onClick={openCarousel} src={url.urlString} alt=""/>
              </div>
            );
          })
        }
      </div>
      {
        (uploadModalOpen) ?
        <UploadContainer
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
          uploadFile={filesArray}
          progress={progress}
          setModalOpen={setUploadModalOpen}
          displayComponent={displayComponent}
          setUploadFile={setFilesArray}
          setComponent={setComponent}
          stopModalClose={stopModalClose}
        />
        :
        <></>
      }
      <Carousel 
        imgURLs={imgURLs}
        setImgURLs={setImgURLs}
        campsites={campsites}
        match={match}
        imgIndex={imgIndex}
        setImgIndex={setImgIndex}
        isCarouselOpen={isCarouselOpen}
        setCarouselOpen={setCarouselOpen}
      />
    </div>
  );
}

export default Photos;