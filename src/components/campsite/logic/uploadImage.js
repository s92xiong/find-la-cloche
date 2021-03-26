import { auth, firestore, storage } from "../../../firebase";
import getDate from "./getDate";

const uploadImage = (match, filesArray, setProgress, setCurrModalPage, setStopModalClose, item) => {
  // Prevent unauthorized users from uploading images
  if (!auth.currentUser) {
    return console.log("User must be logged in to upload images!!");
  } else if (!filesArray) {
    return console.log("You must choose a file to upload.");
  }

  setCurrModalPage(2);
  setStopModalClose(true);
  
  // Iterate through every file and upload the file to Firebase Storage, also add URL to Firestore
  for (const file of filesArray) {
    const date = Date.now();
    
    // Upload image to firebase 
    const uploadTask = storage.ref(`images/${match.params.id}/${file.name}-${date}`).put(file);
    uploadTask.on("state_changed",
      // Progress function
      (snapshot) => {
        const percentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        // console.log(`Upload progress: ${percentage}%`);
        setProgress(percentage);
      },
      // Error function
      (error) => {
        console.error(error);
        setStopModalClose(false); // User can close the modal if the upload fails
      },
      // Complete/Success function
      async () => {
        // Get url of the image added to Storage
        const url = await storage.ref(`images/${match.params.id}`).child(`${file.name}-${date}`).getDownloadURL();

        const newItem = {...item};
        newItem.images.push({
          campsite: item.name,
          date: getDate(),
          display: false,
          imgURL: url,
          name: auth.currentUser.displayName,
          userID: auth.currentUser.uid,
          userIcon: auth.currentUser.photoURL,
        });
      
        // Add URL to Firestore collection
        await firestore.collection("campsites").doc(match.params.id).update({ images: newItem.images });
      }
    );
  }
  return true;
};

export default uploadImage;