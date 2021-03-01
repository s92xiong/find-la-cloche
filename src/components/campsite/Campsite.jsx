import React, { useEffect, useState } from 'react';
import { firestore } from '../../firebase';
import getCampsites from '../Home/getCampsites';
import Header from './Header';
import Carousel from './Carousel';
import Reviews from './Reviews';
import "./styles/Campsite.css";
import UploadImage from './UploadImage';
import uploadLogic from './uploadLogic';

function Campsite({ match }) {
  // Initialize array of campsites
  const [campsites, setCampsites] = useState([]);

  // For the currently active campsite
  const [item, setItem] = useState({});

  // File information for upload
  const [uploadFile, setUploadFile] = useState(null);

  // Show progress as upload occurs
  const [progress, setProgress] = useState(0);

  // Access the specific campsite
  const getDoc = async (id) => {
    const snapshot = await firestore.collection('campsites').doc(id).get();
    const data = snapshot.data();
    setItem(data);
  };

  const handleChange = (e) => {
    // Update state whenever a new file is chosen
    setUploadFile(e.target.files[0]);
  };

  const handleUpload = () => {
    return uploadLogic(match, uploadFile, campsites, setProgress);
  };

  useEffect(() => {
    getCampsites(campsites, setCampsites, null);
    getDoc(match.params.id);
  }, [match, campsites]);

  return (
    <div className="campsite-container">
      <div className="campsite">
        <Header item={item} />
        <Carousel match={match} />
        <Reviews />
        <UploadImage 
          handleChange={handleChange}
          handleUpload={handleUpload}
          progress={progress}
        />
      </div>
    </div>
  );
}

export default Campsite;