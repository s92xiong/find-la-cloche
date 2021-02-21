import React, { useEffect, useState } from 'react';
import "./styles/CampsiteHeader.css";
import { FaStar } from 'react-icons/fa';
import getCampsites from '../Home/getCampsites';
import SelectCampsite from './SelectCampsite';

function CampsiteHeader({ item }) {

  const [campsites, setCampsites] = useState([]);
  const [url, setURL] = useState(null);

  useEffect(() => {
    if (campsites.length < 1) {
      getCampsites(campsites, setCampsites, null);
    }
  }, [campsites]);

  return (
    <div className="campsite-header campsite-header-no-image">
      <div className="left-side-header">
        <h2 className="campsite-title">{item.name}</h2>
        <div className="five-star-rating">
          {
            // Temporary star location
            [...Array(5)].map((star, i) => <FaStar key={i} size={20} className="campsite-header-stars" />)
          }
        </div>
      </div>
      <SelectCampsite campsites={campsites} url={url} setURL={setURL} />
    </div>
  );
}

export default CampsiteHeader;