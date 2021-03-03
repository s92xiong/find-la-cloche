/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import "./Campsite.css";
import { firestore } from '../../firebase';
import getCampsites from '../Home/getCampsites';
import uploadImage from './logic/uploadImage';
import getImages from './logic/getImages';
import Header from './Header/Header';
import ModuleCard from './Card/Card';
// import Carousel from './Carousel/Carousel';
import Content from './Content/Content';
import UploadContainer from './UploadContainer/UploadContainer';

function Campsite({ match }) {
  // Initialize array of campsites
  const [campsites, setCampsites] = useState([]);

  // For the currently active campsite
  const [item, setItem] = useState({});

  // File information for upload
  const [uploadFile, setUploadFile] = useState(null);

  // Show progress as upload occurs
  const [progress, setProgress] = useState(0);

  // Array that contains all of the image urls in a campsite directory
  const [imgURLs, setImgURLs] = useState([]);

  // Access the specific campsite
  const getDoc = async (id) => {
    const snapshot = await firestore.collection('campsites').doc(id).get();
    const data = snapshot.data();
    setItem(data);
  };

  const handleChange = (e) => {
    // Update file state when a new file is selected
    setUploadFile(e.target.files[0]);
  };

  const handleUpload = () => {
    return uploadImage(match, uploadFile, campsites, setProgress);
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
        <Content />
        {/* <Carousel
          imgURLs={imgURLs} 
          setImgURLs={setImgURLs}
        /> */}
        {/* <UploadContainer 
          handleChange={handleChange}
          handleUpload={handleUpload}
          progress={progress}
        /> */}
      </div>
    </div>
  );
}

export default Campsite;