import { auth, firestore } from '../../../firebase';
import getDate from "./getDate";

const addReviewToFirestore = async (match, item, setItem, rating, userText, radioInputs, userData) => {
  // Prevent function from executing if rating or userText is not available
  if (!rating || !userText || !item) return;

  const reviewObj = {
    campsite: item.name,
    date: getDate(),
    name: auth.currentUser.displayName,
    photoURL: auth.currentUser.photoURL,
    questions: radioInputs,
    rating: rating,
    reviewID: Date.now(),
    text: userText,
    userID: auth.currentUser.uid,
  };

  // Copy campsite item, add review
  const newCampsiteReviews = {...item}.reviews;
  newCampsiteReviews.push(reviewObj);

  // Copy user item, add review 
  const newUserReviews = {...userData}.reviews;
  newUserReviews.push(reviewObj);

  // Add rating and user review (string) to Firestore DB
  try {
    await firestore.collection("campsites").doc(match.params.id).update({ reviews: newCampsiteReviews });
    await firestore.collection("users").doc(auth.currentUser.uid).update({ reviews: newUserReviews });

    // Update state to render new review
    setItem({...item, reviews: newCampsiteReviews});
  } catch (error) {
    console.error(error);
  }
};

export default addReviewToFirestore;