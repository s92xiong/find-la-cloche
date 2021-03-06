import React, { useEffect } from 'react';
import "./Carousel.css";
import leftArrow from "../../../images/arrow-left.png";
import rightArrow from "../../../images/arrow-right.png";
import moveIndex from '../logic/moveIndex';
import { auth } from '../../../firebase';
import deleteImage from '../logic/deleteImage';
import { showContainer } from '../logic/showHideContainer';
import placeholderUser from "../../../images/person_placeholder.png";
import { useAuthState } from 'react-firebase-hooks/auth';

function Carousel({ match, item, setItem, imgIndex, setImgIndex, isCarouselOpen, setCarouselOpen }) {

  const [user] = useAuthState(auth);

  const handleLeftButton = () => {
    if (imgIndex === 0) return;
    moveIndex("left", imgIndex, setImgIndex, item, setItem);
  };

  const handleRightButton = () => {
    if (imgIndex === item.images.length - 1) return;
    moveIndex("right", imgIndex, setImgIndex, item, setItem);
  };

  const closeCarousel = () => {
    setCarouselOpen(false);

    // Return scroll functionality to normal
    const campsiteContainer = document.querySelector(".campsite-container");
    campsiteContainer.style.height = "auto";
    campsiteContainer.style.overflowY = "auto";
  };

  const pressEsc = (e) => (e.key === "Escape") && closeCarousel();
  const pressLeftKey = (e) => (e.key === "ArrowLeft") && handleLeftButton();
  const pressRightKey = (e) => (e.key === "ArrowRight") && handleRightButton();

  const handleRemovePhoto = async (e) => {
    // Prompt user to confirm photo delete
    const result = window.confirm("Are you sure you want to delete this photo?");
    if (!result) return;

    // Get file name and delete image
    const imgName = e.target.dataset.url;
    await deleteImage(match, item, setItem, imgName);

    // Close carousel after deleting image
    setCarouselOpen(false);
    showContainer();
  };

  useEffect(() => {
    if (isCarouselOpen) {
      document.addEventListener("keydown", pressEsc);
      document.addEventListener("keydown", pressLeftKey);
      document.addEventListener("keydown", pressRightKey);
    }

    return () => {
      document.removeEventListener("keydown", pressEsc);
      document.removeEventListener("keydown", pressLeftKey);
      document.removeEventListener("keydown", pressRightKey);
    };
  });

  if (!isCarouselOpen || !item) return <></>;
  return (
    <div className="carousel noselect">
      <div className="close-carousel-button" onClick={closeCarousel}>???</div>
      <div className="arrow-container arrow-container-left" onClick={handleLeftButton}>
        <img src={leftArrow} alt="" />
      </div>
      <div className="arrow-container arrow-container-right" onClick={handleRightButton}>
        <img src={rightArrow} alt="" />
      </div>
      {
        (item.images.length === 0) ?
        <></>
        :
        item.images.map((imgObj, i) => (
          // conditional prevents overlapping of bars on top of each other
          <div className={ (imgObj.display) ? "carousel-bar" : "carousel-bar hide" }>
            <img
              key={i}
              src={imgObj.imgURL}
              alt=""
              className={
                (imgObj.display) ?
                "campsite-img"
                :
                "campsite-img campsite-img-hidden"
              }
            />
            <div className="carousel-img-info">
              <img className="carousel-user-icon" src={(imgObj.userIcon) ? imgObj.userIcon : placeholderUser} alt=""/>
              <div>
                <p>{imgObj.name}</p>
                <p>{imgObj.campsite}</p>
              </div>
            </div>
            <div className="carousel-bottom-right">
              {
                (user && user.uid === imgObj.userID) && 
                <p data-url={imgObj.fileName} className="carousel-delete" onClick={handleRemovePhoto}>Remove photo</p>
              }
              <p className="carousel-date">{imgObj.date}</p>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default Carousel;