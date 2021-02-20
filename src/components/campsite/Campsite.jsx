import React, { useEffect, useState } from 'react';
import { auth, firestore, storage } from '../../firebase';
import CampsiteHeader from './CampsiteHeader';
import Carousel from './Carousel';
import Reviews from './Reviews';
import "./styles/Campsite.css";
import UploadImage from './UploadImage';

function Campsite({ match }) {

  // Initialize state for campsite item
  const [item, setItem] = useState({});

  // Initialize state for image
  const [image, setImage] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const [progress, setProgress] = useState(0);

  // Access the specific campsite
  const getDoc = async (id) => {
    const snapshot = await firestore.collection('campsites').doc(id).get();
    const data = snapshot.data();
    setItem(data);
  };

  const handleChange = (e) => {
    // Update state whenever a new file is chosen
    setImage(e.target.files[0]);
  };

  const handleUpload = () => {
    // Prevent non-registered users from uploading images
    if (!auth.currentUser) {
      return console.log("User must be logged in to upload images!!");
    } else if (!image) {
      return console.log("You must choose a file to upload.");
    }

    // Upload image to firebase 
    storage.ref(`images/${match.params.id}/${image.name}`).put(image).on("state_changed",
      // Progress function
      (snapshot) => {
        const percentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log(`Upload progress: ${percentage}%`);
        setProgress(percentage);
      },
      // Error function
      (error) => console.error(error),
      // Complete/Success function
      () => storage.ref(`images/${match.params.id}`).child(image.name).getDownloadURL().then(url => {
        console.log(url);
        setImage(null);
      })
    );
  };

  useEffect(() => {
    getDoc(match.params.id);
  }, [match, image]);

  return (
    <div className="campsite-container">
      <div className="campsite">
        <CampsiteHeader item={item} />
        <Carousel />
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