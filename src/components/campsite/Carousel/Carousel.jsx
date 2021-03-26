import React, { useEffect } from 'react';
import "./Carousel.css";
import leftArrow from "../../../images/arrow-left.png";
import rightArrow from "../../../images/arrow-right.png";
import moveIndex from '../logic/moveIndex';

function Carousel({ item, setItem, imgIndex, setImgIndex, isCarouselOpen, setCarouselOpen }) {

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

  if (!isCarouselOpen || !item) return <></>
  return (
    <div className="carousel noselect">
      <div className="close-carousel-button" onClick={closeCarousel}>✕</div>
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
        ))
      }
    </div>
  );
}

export default Carousel;