import React, { useEffect, useState } from 'react';
import retrieveImages from './RetrieveImages';
import "./styles/Carousel.css";

function Carousel({ match }) {

  const [imgURLs, setImgURLs] = useState([]);

  useEffect(() => {
    retrieveImages(match, setImgURLs);
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