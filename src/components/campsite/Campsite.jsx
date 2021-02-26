import React, { useEffect, useState } from 'react';
import { auth, firestore, storage } from '../../firebase';
import getCampsites from '../Home/getCampsites';
import Header from './Header';
import Carousel from './Carousel';
import Reviews from './Reviews';
import "./styles/Campsite.css";
import UploadImage from './UploadImage';

function Campsite({ match }) {
  // Initialize array state for campsites
  const [campsites, setCampsites] = useState([]);

  // Initialize state for campsite item
  const [item, setItem] = useState({});

  // Initialize state for image
  const [uploadFile, setUploadFile] = useState(null);

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
    setUploadFile(e.target.files[0]);
  };

  const handleUpload = () => {
    // Prevent non-registered users from uploading images
    if (!auth.currentUser) {
      return console.log("User must be logged in to upload images!!");
    } else if (!uploadFile) {
      return console.log("You must choose a file to upload.");
    }

    const date = Date.now();

    // Upload image to firebase 
    const uploadTask = storage.ref(`images/${match.params.id}/${uploadFile.name}-${date}`).put(uploadFile);
    uploadTask.on("state_changed",
      // Progress function
      (snapshot) => {
        const percentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log(`Upload progress: ${percentage}%`);
        setProgress(percentage);
      },
      // Error function
      (error) => console.error(error),
      // Complete/Success function
      async () => {
        const url = await storage.ref(`images/${match.params.id}`).child(`${uploadFile.name}-${date}`).getDownloadURL();

        let index;
        campsites.forEach((campsite, i) => {
          if (campsite.id === match.params.id) {
            index = i;
          }
        })

        // Access index of campsite, copy campsite array, update prop, then add to update Firestore
        const newCampsites = [...campsites];
        newCampsites[index].images = [...campsites[index].images, url];
      
        // Add URL to Firestore collection
        firestore.collection("campsites").doc(match.params.id).update({
          images: newCampsites[index].images
        })
        .then(() => console.log("Image URl has been added to Firestore!"))
        .catch((error) => console.error(error));
      }
    );
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