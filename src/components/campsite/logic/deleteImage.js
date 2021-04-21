import { auth, firestore, storage } from "../../../firebase";

async function deleteImage(match, item, setItem, imgName) {
  try {
    // Remove image from Storage
    const fileRef = storage.ref(`/images`).child(`/${match.params.id}/${imgName}`);
    await fileRef.delete();

    // Remove image item from Firestore
    const filteredImages = item.images.filter(imgObj => (imgObj.fileName !== imgName));
    await firestore.collection("campsites").doc(match.params.id).update({ images: filteredImages });

    const userImages = filteredImages.filter(obj => (obj.userID === auth.currentUser.uid));
    await firestore.collection("users").doc(auth.currentUser.uid).update({ images: userImages });

    setItem({ ...item, images: filteredImages });
    
  } catch (error) {
    console.error(error);
    console.log("Error occurred!");
  }
}

export default deleteImage;