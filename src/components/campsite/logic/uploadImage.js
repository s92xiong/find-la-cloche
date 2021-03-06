import { auth, firestore, storage } from "../../../firebase";

const uploadImage = (
  match, filesArray, setFilesArray, campsites, setProgress, 
  setModalOpen, setComponent, setStopModalClose
) => {
  // Prevent unauthorized users from uploading images
  if (!auth.currentUser) {
    return console.log("User must be logged in to upload images!!");
  } else if (!filesArray) {
    return console.log("You must choose a file to upload.");
  }

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
        console.log(`Upload progress: ${percentage}%`);
        setProgress(percentage);
      },
      // Error function
      (error) => console.error(error),
      // Complete/Success function
      async () => {
        const url = await storage
                    .ref(`images/${match.params.id}`)
                    .child(`${file.name}-${date}`)
                    .getDownloadURL();
        
        let index;
        campsites.forEach((campsite, i) => {
          if (campsite.id === match.params.id) {
            index = i;
          }
        });
  
        // Access index of campsite, copy campsite array, update prop, then add to update Firestore
        const newCampsites = [...campsites];
        newCampsites[index].images = [...campsites[index].images, url];
      
        // Add URL to Firestore collection
        await firestore.collection("campsites").doc(match.params.id).update({
          images: newCampsites[index].images
        });

        // Close the modal and clear image file state, display 1st component
        setModalOpen(false);
        setFilesArray(null);
        setComponent(0);
        setStopModalClose(false);
      }
    );
  }

};

export default uploadImage;