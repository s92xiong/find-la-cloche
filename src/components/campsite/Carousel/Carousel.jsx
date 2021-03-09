import React, { useEffect } from 'react';
import "./Carousel.css";
import leftArrow from "../../../images/arrow-left.png";
import rightArrow from "../../../images/arrow-right.png";

function Carousel({ imgURLs, setImgURLs, imgIndex, setImgIndex, isCarouselOpen, setCarouselOpen }) {

  const closeCarousel = () => {
    setCarouselOpen(false);

    // Update DOM to bring back scoll
  };

  const moveIndex = (direction) => {
    let value;

    if (direction === "left") {
      value = -1;
    } else if (direction === "right") {
      value = 1;
    }

    const array = [...imgURLs];
    array.forEach(item => (item.display) ? item.display = false : null);
    array[imgIndex + value].display = true;
    setImgIndex(imgIndex + value);
    return setImgURLs(array);
  };

  const handleLeftButton = () => {
    if (imgIndex === 0) return console.log("First index");
    moveIndex("left");
  };

  const handleRightButton = () => {
    if (imgIndex === imgURLs.length - 1) return console.log("Last index");
    moveIndex("right");
  };

  const pressEsc = (e) => (e.key === "Escape") && setCarouselOpen(false);
  
  const pressLeftKey = (e) => {
    if (e.key === "ArrowLeft") {
      handleLeftButton();
    }
  };

  const pressRightKey = (e) => {
    if (e.key === "ArrowRight") {
      handleRightButton();
    }
  }

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