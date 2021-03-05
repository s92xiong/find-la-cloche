import React, { useEffect, useState } from 'react';
import "./Campsite.css";
import { firestore } from '../../firebase';
import getCampsites from '../Home/getCampsites';
import getImages from './logic/getImages';
import Header from './Header/Header';
import ModuleCard from './Card/Card';
// import Carousel from './Carousel/Carousel';
import Content from './Content/Content';
// import UploadContainer from './UploadContainer/UploadContainer';

function Campsite({ match }) {
  // Initialize array of campsites
  const [campsites, setCampsites] = useState([]);

  // For the currently active campsite
  const [item, setItem] = useState({});

  // Array that contains all of the image urls in a campsite directory
  const [imgURLs, setImgURLs] = useState([]);

  // Access the specific campsite
  const getDoc = async (id) => {
    const snapshot = await firestore.collection('campsites').doc(id).get();
    const data = snapshot.data();
    setItem(data);
  };

  useEffect(() => {
    getCampsites(campsites, setCampsites, null);
    getDoc(match.params.id);
    getImages(match, setImgURLs);
  }, [match, campsites]);

  return (
    <div className="campsite-container">
      <div className="campsite">
        <Header item={item} campsites={campsites} />
        <ModuleCard 
          item={item}
          imgURLs={imgURLs}
        />
        <Content imgURLs={imgURLs} campsites={campsites} match={match} />
        {/* <Carousel
          imgURLs={imgURLs} 
          setImgURLs={setImgURLs}
        /> */}
      </div>
    </div>
  );
}

export default Campsite;