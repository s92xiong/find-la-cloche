import React, { useEffect, useState } from 'react';
import { auth, firestore, storage } from '../../firebase';
import "./styles/Campsite.css";

function Campsite({ match }) {

  // Initialize state for campsite item
  const [item, setItem] = useState({});

  // Initialize state for image
  const [image, setImage] = useState(null);

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
    storage.ref(`images/${image.name}`).put(image).on("state_changed",
      // Progress function
      (snapshot) => {
        const percentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log(`Upload progress: ${percentage}% complete.`);
      },
      // Error function
      (error) => console.error(error),
      // Complete/Success function
      () => storage.ref("images").child(image.name).getDownloadURL().then(url => console.log(url))
    );
  };

  useEffect(() => {
    getDoc(match.params.id);
  }, [match, image]);

  // if (!auth) return <></>;
  return (
    <div className="campsite">
      <h1>{item.name}</h1>
      <input className="uploader-input" type="file" onChange={handleChange}/>
      <button className="uploader-button" onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default Campsite;