import React, { useEffect } from 'react';
import "./Carousel.css";
import leftArrow from "../../../images/arrow-left.png";
import rightArrow from "../../../images/arrow-right.png";
import moveIndex from '../logic/moveIndex';

function Carousel({ imgURLs, setImgURLs, imgIndex, setImgIndex, isCarouselOpen, setCarouselOpen }) {

  const handleLeftButton = () => {
    if (imgIndex === 0) return;
    moveIndex("left", imgURLs, imgIndex, setImgIndex, setImgURLs);
  };

  const handleRightButton = () => {
    if (imgIndex === imgURLs.length - 1) return;
    moveIndex("right", imgURLs, imgIndex, setImgIndex, setImgURLs);
  };

  const closeCarousel = () => {
    setCarouselOpen(false);

    // Update DOM to bring back scroll
    // const campsiteContainer = document.querySelector(".campsite-container");
    // campsiteContainer.style.minHeight = "calc(100vh - 70px);";
    // campsiteContainer.style.overflowY = "auto";
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
    }
  });

  if (!isCarouselOpen) return <></>
  return (
    <div className="carousel">
      <div className="close-carousel" onClick={closeCarousel}>✕</div>
      <img 
        className="carousel-left-arrow" 
        src={leftArrow}
        alt="" 
        onClick={handleLeftButton}
      />
      <img
        className="carousel-right-arrow"
        src={rightArrow}
        alt=""
        onClick={handleRightButton}
      />
      {
        (imgURLs.length === 0) ?
        <></>
        :
        imgURLs.map(url => (
          <img 
            key={url.urlString}
            src={url.urlString} 
            alt="" 
            className={
              (url.display) ?
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