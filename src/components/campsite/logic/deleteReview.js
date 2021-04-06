import { auth, firestore } from "../../../firebase";

async function deleteReview(match, filteredReviews, item, setItem) {
  try {
    // Add filtered reviews to Firestore and update the current to state
    await firestore.collection("campsites").doc(match.params.id).update({ reviews: filteredReviews });
    await firestore.collection("users").doc(auth.currentUser.uid).update({ reviews: filteredReviews });
    setItem({...item, reviews: filteredReviews});
  } catch (error) {
    console.error(error);
  }
}

export default deleteReview;