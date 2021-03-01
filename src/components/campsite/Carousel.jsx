import React, { useEffect, useState } from 'react';
import getImages from './getImages';
import "./styles/Carousel.css";

function Carousel({ match }) {

  const [imgURLs, setImgURLs] = useState([]);

  useEffect(() => {
    getImages(match, setImgURLs);
  }, [match]);

  return (
    <div className="carousel">
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