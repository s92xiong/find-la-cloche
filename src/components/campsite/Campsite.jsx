import React, { useEffect, useState } from 'react';
import "./Campsite.css";
import { firestore } from '../../firebase';
import getCampsites from '../Home/getCampsites';
import getImages from './logic/getImages';
import Header from './Header/Header';
import ModuleCard from './Card/Card';
import Content from './Content/Content';
import getReviews from './logic/getReviews';

function Campsite({ match }) {
  // Initialize array of campsites
  const [campsites, setCampsites] = useState([]);

  // For the currently active campsite
  const [item, setItem] = useState({});

  // Array that contains all of the image urls in a campsite directory
  const [imgURLs, setImgURLs] = useState([]);

  // Initialize state for reviews of a campsite
  const [reviewsList, setReviewsList] = useState([]);

  // Access the specific campsite
  const getCampsiteDoc = async (id) => {
    const snapshot = await firestore.collection('campsites').doc(id).get();
    const data = snapshot.data();
    setItem(data);
  };

  useEffect(() => {
    getCampsites(campsites, setCampsites, null);
    getCampsiteDoc(match.params.id);
    getImages(match, setImgURLs);
  }, [match, campsites]);

  useEffect(() => {
    getReviews(match, setReviewsList);
    return () => setReviewsList([]);
  }, [match]);

  return (
    <div className="campsite-container">
      <div className="campsite">
        <Header campsites={campsites} />
        <ModuleCard 
          item={item}
          imgURLs={imgURLs}
          reviewsList={reviewsList}
        />
        <Content
          imgURLs={imgURLs}
          setImgURLs={setImgURLs}
          campsites={campsites}
          match={match}
          item={item}
          reviewsList={reviewsList}
          setReviewsList={setReviewsList}
        />
      </div>
    </div>
  );
}

export default Campsite;