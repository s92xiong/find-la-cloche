import { firestore } from "../../../firebase";

const getReviews = async (match, setReviewsList) => {
  // Retrieve reviews from Firestore
  const snapshot = await firestore.collection('campsites').doc(match.params.id).get();
  const data = snapshot.data();
  
  // Stop the function if a campsite has no reviews, the array will be left empty
  if (data.reviews.length === 0) {
    setReviewsList(null);
  } else {
    setReviewsList(data.reviews);
  }
};

export default getReviews;