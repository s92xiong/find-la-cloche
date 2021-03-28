import { firestore, storage } from "../../../firebase";

async function deleteImage(match, item, setItem, fileName) {  
  try {
    // Remove image from Storage
    const storageRef = storage.ref(`/images`)
    const fileRef = storageRef.child(match.params.id).child(fileName);
    await fileRef.delete();

    // Remove image item from Firestore
    const filteredImages = item.images.filter(imgObj => (imgObj.fileName !== fileName));
    await firestore.collection("campsites").doc(match.params.id).update({ images: filteredImages });
    setItem({ ...item, images: filteredImages });
  } catch (error) {
    console.error(error);
    console.log("Error occurred!");
  }
}

export default deleteImage;