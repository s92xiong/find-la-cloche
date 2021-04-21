import { auth, firestore, storage } from "../../../firebase";
import getDate from "./getDate";
import { showContainer } from "./showHideContainer";

const uploadImage = async (match, filesArray, setFilesArray, setProgress, setUploadModalOpen, setCurrModalPage, setStopModalClose, item) => {
  // Prevent unauthorized users from uploading images
  if (!auth.currentUser) {
    return console.log("User must be logged in to upload images!!");
  } else if (!filesArray) {
    return console.log("You must choose a file to upload.");
  }

  const defaultSettings = () => {
    setUploadModalOpen(false);
    setFilesArray(null);
    setCurrModalPage(0);
    setStopModalClose(false);
    showContainer();
  };

  const filterSortUpload = async () => {
      // Filter out any invalid/unsucessful uploads, sort objects by upload index
    const newImages = tempArray.filter((obj) => (obj !== null )).sort((a, b) => (a.uploadIndex > b.uploadIndex) ? 1 : -1);
    const imagesCopy = {...item}.images;

    // Add URL to Firestore DB collections: "campsites" & "users"
    await firestore.collection("campsites").doc(match.params.id).update({
      images: imagesCopy.concat(newImages)
    });

    // Filter for only user images and store it in the user inside "users" collection in Firestore
    const userImages = imagesCopy.concat(newImages).filter(obj => (obj.userID === auth.currentUser.uid));

    await firestore.collection("users").doc(auth.currentUser.uid).update({
      images: userImages
    });

    defaultSettings();
  };

  // Display 3rd page of the ModalPhoto, prevent modal from being closed
  setCurrModalPage(2);
  setStopModalClose(true);

  // Initialize temporary array to be added to Firestore
  const tempArray = [];
  
  // Iterate through every file in filesArray, upload file to Storage & add URL to Firestore
  for (let i = 0; i < filesArray.length; i++) {
    
    const date = Date.now(); // Get date to generate unique file-name id
    
    // Upload image to firebase 
    const uploadTask = storage.ref(`images/${match.params.id}/${filesArray[i].name}-${date}`).put(filesArray[i]);
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
        tempArray.push(null);
        alert(`File size of ${filesArray[i].name} must be less than 20 MB!`);
        // Filter, sort, and add imgURLs to Firestore even if the last uploaded image fails
        if (tempArray.length === filesArray.length) filterSortUpload();
      },
      // Complete/Success function
      async () => {
        // Get url of the image added to Storage
        const url = await storage.ref(`images/${match.params.id}`).child(`${filesArray[i].name}-${date}`).getDownloadURL();

        tempArray.push({
          campsite: item.name,
          date: getDate(),
          display: false,
          fileName: `${filesArray[i].name}-${date}`, // Must be the same as the ref argument
          imgURL: url,
          name: auth.currentUser.displayName,
          uploadIndex: i, // key:value sorts uploaded images in original order
          userIcon: auth.currentUser.photoURL,
          userID: auth.currentUser.uid,
        });

        // Execute function only if this is the last image to be uploaded
        if (tempArray.length === filesArray.length) filterSortUpload();
      }
    );
  }
};

export default uploadImage;