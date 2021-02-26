import React, { useEffect, useState } from 'react';
import retrieveImages from './RetrieveImages';
import "./styles/Carousel.css";

function Carousel({ match }) {

  const [URLs, setURLs] = useState([]);

  useEffect(() => {
    retrieveImages(match, URLs, setURLs);
  }, [URLs, match]);

  return (
    <div className="carousel">
      {
        (URLs.length === 0) ?
        <></>
        :
        URLs.map(url => (
          <img src={url} alt="" className="campsite-img" key={url} />
        ))
      }
    </div>
  );
}

export default Carousel;