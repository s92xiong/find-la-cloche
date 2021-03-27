import { firestore } from "../../../firebase";

async function deleteReview(match, filteredReviews, item, setItem) {
  try {
    // Add filtered reviews to Firestore and update the current to state
    await firestore.collection("campsites").doc(match.params.id).update({ reviews: filteredReviews });
    setItem({...item, reviews: filteredReviews});
  } catch (error) {
    console.error(error);
  }
}

export default deleteReview;