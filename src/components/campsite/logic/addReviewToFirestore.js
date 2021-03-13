import { auth, firestore } from '../../../firebase';

const addReviewToFirestore = async (match, campsites, rating, userText) => {
  // Get index of the current campsite open
  let index;
  campsites.forEach((campsite, i) => {
    if (campsite.id === match.params.id) index = i;
  });

  // Get date information
  const date = new Date();
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  const newReviews = [...campsites][index].reviews;
  newReviews.push({
    // Add name of user, picture of user, date of review (March 11, 2021)
    date: `${month} ${day}, ${year}`,
    name: auth.currentUser.displayName,
    photoURL: auth.currentUser.photoURL,
    rating: rating,
    text: userText
  });

  // Add rating and user review (string) to Firestore DB
  try {
    await firestore.collection("campsites").doc(match.params.id).update({ reviews: newReviews });
    console.log("Success!!");
  } catch (error) {
    console.error(error);
  }
};

export default addReviewToFirestore