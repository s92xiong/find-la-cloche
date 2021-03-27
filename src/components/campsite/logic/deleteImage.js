import { storage } from "../../../firebase";

async function deleteImage(match, item, setItem, url) {
  try {
    // Delete image from Firebase Storage
    const fileRef = storage.child(`/images/${url}`);
    const result = await fileRef.delete();
    console.log(result);
  } catch (error) {
    console.error(error);
  }

}

export default deleteImage;