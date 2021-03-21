import { firestore } from "../../../firebase";
import getReviews from "./getReviews";

async function deleteReview(match, filteredReviews, setReviewsList) {
  try {
    await firestore.collection("campsites").doc(match.params.id).update({ reviews: filteredReviews });
    getReviews(match, setReviewsList);
  } catch (error) {
    console.error(error);
  }
}

export default deleteReview;