import { auth, firestore } from '../../../firebase';
import getDate from "./getDate";

const addReviewToFirestore = async (match, item, setItem, rating, userText, radioInputs) => {
  // Prevent function from executing if rating or userText is not available
  if (!rating || !userText || !item) return;

  // Copy item object w/ its [reviews] array
  const newReviews = {...item}.reviews;
  
  newReviews.push({
    // Add name of user, picture of user, date of review (March 11, 2021)
    date: getDate(),
    name: auth.currentUser.displayName,
    photoURL: auth.currentUser.photoURL,
    questions: radioInputs,
    rating: rating,
    reviewID: Date.now(),
    text: userText,
    userID: auth.currentUser.uid,
  });

  // Add rating and user review (string) to Firestore DB
  try {
    await firestore.collection("campsites").doc(match.params.id).update({ reviews: newReviews });
    // Update state to render new review
    setItem({...item, reviews: newReviews});
  } catch (error) {
    console.error(error);
  }
};

export default addReviewToFirestore;