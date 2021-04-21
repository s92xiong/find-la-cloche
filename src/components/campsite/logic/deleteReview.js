import { auth, firestore } from "../../../firebase";

async function deleteReview(match, campsiteReviews, item, setItem, userReviews) {
  try {
    // Add filtered reviews to Firestore and update the current to state
    await firestore.collection("campsites").doc(match.params.id).update({ reviews: campsiteReviews });
    await firestore.collection("users").doc(auth.currentUser.uid).update({ reviews: userReviews });
    setItem({...item, reviews: campsiteReviews});
  } catch (error) {
    console.error(error);
  }
}

export default deleteReview;