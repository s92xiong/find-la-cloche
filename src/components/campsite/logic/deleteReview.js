import { firestore } from "../../../firebase";
import getReviews from "./getReviews";

async function deleteReview(match, filteredReviews, setReviewsList) {
  try {
    await firestore.collection("campsites").doc(match.params.id).update({ reviews: filteredReviews });
    getReviews(match, setReviewsList); // Update state after deleting review
    console.log("Your review has been deleted!");
  } catch (error) {
    console.error(error);
  }
}

export default deleteReview;