import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase';
import "./styles/Photos.css";
import uploadImage from "../logic/uploadImage";
import UploadContainer from "../UploadContainer/UploadContainer";
import Carousel from '../Carousel/Carousel';

function Photos({ imgURLs, setImgURLs, campsites, match }) {

  const [user] = useAuthState(auth);

  // Render a error message if unauthorized user tries to upload photos
  const [errorMessage, setErrorMessage] = useState(false);

  // File information for photos upload
  const [filesArray, setFilesArray] = useState(null);

  // Show progress as upload occurs
  const [progress, setProgress] = useState(0);

  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  // Conditionally render 3 different components in UploadContainer (0, 1, 2)
  const [displayComponent, setComponent] = useState(0);

  // Prevent UploadContainer modal from closing when upload progress is occuring
  const [stopModalClose, setStopModalClose] = useState(false);

  // Keep track of which img should be displayed in the carousel using integers
  const [imgIndex, setImgIndex] = useState();

  const [isCarouselOpen, setCarouselOpen] = useState(false);

  // Run code when user clicks on "Upload Photos" button
  const openUploadModal = () => {
    if (!user) return setErrorMessage(true);
    setUploadModalOpen(true);
  };

  // Update file state when a new set of files or file is selected
  const handleFileChange = (e) => {
    setFilesArray(e.target.files);
    setComponent(1);
  };

  // Logic to handle uploading image(s) to Firebase
  const handleUpload = () => {
    return uploadImage(
      match, filesArray, setFilesArray, campsites, setProgress, 
      setUploadModalOpen, setComponent, setStopModalClose
    );
  };

  // Open the carousel when a user clicks on any image in the Photos container
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

    // Hide scroll bar
    const campsiteContainer = document.querySelector(".campsite-container");
    campsiteContainer.style.height = "0px";
    campsiteContainer.style.overflowY = "hidden";
  };

  useEffect(() => {
    if (errorMessage) {
      // Remove error message after 3 seconds
      setTimeout(() => setErrorMessage(false), 3000);
    }
  }, [errorMessage]);

  return (
    <div className="photos-container">
      <div className="add-photos">
        <div className="add-photos-label">
          {
            (imgURLs.length > 1) ? <h2>Add photos of this campsite</h2> : <h2>There are currently no photos of this campsite</h2>
          }
          {
            (imgURLs.length > 1) ? 
            <p>Photos help others preview the campsite. Upload photos about this campsite to inspire others.</p>
            :
            <p>Be the first user to post photos of this campsite!</p>
          }
        </div>
        <div className="upload-photos-container">
          <button onClick={openUploadModal} className="upload-photos-button">Upload photos</button>
          {
            (errorMessage) ? <span className="upload-error">You must be logged in.</span> : <></>
          }
        </div>
      </div>
      <div className="line-separator"></div>
      {
        (imgURLs.length > 0) ?
        <div className="photos-items-container">
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
        :
        <></>
      }
      {
        (uploadModalOpen) ?
        <UploadContainer
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
          progress={progress}
          setModalOpen={setUploadModalOpen}
          displayComponent={displayComponent}
          uploadFile={filesArray}
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
        imgIndex={imgIndex}
        setImgIndex={setImgIndex}
        isCarouselOpen={isCarouselOpen}
        setCarouselOpen={setCarouselOpen}
      />
    </div>
  );
}

export default Photos;