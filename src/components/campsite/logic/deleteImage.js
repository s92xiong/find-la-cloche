import { firestore, storage } from "../../../firebase";

async function deleteImage(match, item, setItem, fileName) {  
  try {
    // Remove item from Firestore
    const filteredImages = item.images.filter(imgObj => (imgObj.fileName !== fileName));
    const removeImage = await firestore.collection("campsites").doc(match.params.id).update({ images: filteredImages });
    console.log(removeImage);
    setItem({ ...item, images: filteredImages });

    // Delete image from Firebase Storage
    const storageRef = storage.ref(`/images`)
    const fileRef = storageRef.child(match.params.id).child(fileName);
    await fileRef.delete();
    console.log("Deleted image from Firebase Storage!");

    // You may want to close the Carousel modal after deleting an image!
  } catch (error) {
    console.error(error);
    console.log("Error occurred!");
  }
}

export default deleteImage;