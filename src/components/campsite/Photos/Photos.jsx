import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase';
import uploadImage from "../logic/uploadImage";
import { hideContainer } from "../logic/showHideContainer";
import ModalPhoto from "../ModalPhoto/ModalPhoto";
import Carousel from '../Carousel/Carousel';
import "./styles/Photos.css";

function Photos({ match, item, setItem }) {

  // Check if user is logged in
  const [user] = useAuthState(auth);

  // Show error message if unauthorized user clicks on "Upload photos" button
  const [errorMessage, setErrorMessage] = useState(false);

  
  // ------- MODAL PHOTO STATE -------
  
  // File information for photos upload
  const [filesArray, setFilesArray] = useState(null);
  
  // Show progress as upload occurs in the progress bar, starts at 0
  const [progress, setProgress] = useState(0);
  
  // Determine is modal is open
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  
  // Conditionally render 3 different components in ModalPhoto
  const [currModalPage, setCurrModalPage] = useState(0);
  
  // Prevent ModalPhoto from closing when upload progress is occuring
  const [stopModalClose, setStopModalClose] = useState(false);

  
  // ------- CAROUSEL STATE -------

  // Keep track of which img should be displayed in the carousel using integers
  const [imgIndex, setImgIndex] = useState();
  // Determine if carousel is open/closed
  const [isCarouselOpen, setCarouselOpen] = useState(false);

  
  // ------- EVENT HANDLERS -------

  const openModal = () => {
    if (!user) return setErrorMessage(true);
    setUploadModalOpen(true);
    hideContainer();
  };

  const handleFileChange = (e) => {
    setFilesArray(e.target.files);
    setCurrModalPage(1);
  };

  const handleUpload = () => uploadImage(match, filesArray, setFilesArray, setProgress, 
                              setUploadModalOpen, setCurrModalPage, setStopModalClose, item);

  const openCarousel = (e) => {
    // Open specific image clicked on using data attribute
    const index = Number(e.target.dataset.id);
    setImgIndex(index);

    // Copy campsite obj, set all to display none, then set the image w/ index to be displayed
    const updatedImages = {...item}.images;
    updatedImages.forEach(imgObj => (imgObj.display) ? imgObj.display = false : null);
    updatedImages[index].display = true;
    setItem({ ...item, images: updatedImages });
    setCarouselOpen(true);

    // Hide scroll bar
    hideContainer();
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
        {
          (item && item.images.length > 0) ?
          <div className="add-photos-label">
            <h2>Add photos of this campsite</h2>
            <p>Photos help others preview the campsite. Upload photos about this campsite to inspire others.</p>
          </div>
          :
          <div className="add-photos-label">
            <h2>There are currently no photos of this campsite</h2>
            <p>Be the first user to post photos of this campsite!</p>
          </div>
        }
        <div className="upload-photos-container">
          <button onClick={openModal} className="upload-photos-button">Upload photos</button>
          {
            (errorMessage) ? <span className="upload-error">You must be logged in.</span> : <></>
          }
        </div>
      </div>
      <div className="line-separator"></div>
      {
        // Display photos if there are any and if campsite item exists
        (item && item.images.length > 0) &&
        <div className="photos-items-container">
          {
            item.images.map((imgObj, i) => {
              return (
                <div className="photo-item" key={i}>
                  <img data-id={i} onClick={openCarousel} src={imgObj.imgURL} alt=""/>
                </div>
              );
            })
          }
        </div>
      }
      {
        (uploadModalOpen) &&
        <ModalPhoto
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
          progress={progress}
          setModalOpen={setUploadModalOpen}
          filesArray={filesArray}
          setFilesArray={setFilesArray}
          currModalPage={currModalPage}
          setCurrModalPage={setCurrModalPage}
          stopModalClose={stopModalClose}
        />
      }
      <Carousel
        match={match}
        item={item}
        setItem={setItem}
        imgIndex={imgIndex}
        setImgIndex={setImgIndex}
        isCarouselOpen={isCarouselOpen}
        setCarouselOpen={setCarouselOpen}
      />
    </div>
  );
}

export default Photos;