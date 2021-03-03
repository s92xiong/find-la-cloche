import { auth, firestore, storage } from "../../../firebase";

const uploadImage = (match, uploadFile, campsites, setProgress) => {
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

export default uploadImage;