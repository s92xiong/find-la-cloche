import React, { useEffect, useState } from 'react';
import getImages from './logic/getImages';
import "./styles/Carousel.css";

function Carousel({ match }) {

  const [imgURLs, setImgURLs] = useState([]);

  // Initialize variable to determine which img is active
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    getImages(match, setImgURLs);
  }, [match]);

  const handleLeftButton = () => {
    if (imgIndex === 0) return console.log("Current index is at 0");

    const newImgURLs = [...imgURLs];
    newImgURLs[imgIndex].display = false;
    newImgURLs[imgIndex - 1].display = true;

    setImgURLs(newImgURLs);

    setImgIndex(() => imgIndex - 1);
  };

  const handleRightButton = () => {
    if (imgIndex === imgURLs.length - 1) return console.log("Current index is at the last index");

    const newImgURLs = [...imgURLs];
    newImgURLs[imgIndex].display = false;
    newImgURLs[imgIndex + 1].display = true;

    setImgURLs(newImgURLs);

    setImgIndex(() => imgIndex + 1);
  };

  return (
    <div className="carousel">
      <div className="navigate-images">
        <button onClick={handleLeftButton}>Left</button>
        <button onClick={handleRightButton}>Right</button>
      </div>
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