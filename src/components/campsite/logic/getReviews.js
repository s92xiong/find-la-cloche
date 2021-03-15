import { firestore } from "../../../firebase";

const getReviews = async (match, reviewsList, setReviewsList) => {
  // Only retrieve data from Firestore once
  if (reviewsList) return;

  // Retrieve reviews from Firestore, store data in "list" state
  const snapshot = await firestore.collection('campsites').doc(match.params.id).get();
  const data = snapshot.data();
  setReviewsList(data.reviews);
};

export default getReviews;