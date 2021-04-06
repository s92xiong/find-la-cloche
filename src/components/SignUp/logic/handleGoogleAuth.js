import firebase from "firebase/app";
import { auth, firestore } from "../../../firebase";

const handleGoogleAuth = async (e) => {
  e.preventDefault();
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    
    if (result.additionalUserInfo.isNewUser) {
      // Create a new user document in the "users" collection
      await firestore.collection("users").doc(`${auth.currentUser.uid}`).set({
        email: result.user.email,
        photos: [],
        reviews: [],
      });

      // Automatically verify user if they signed in via Google auth
      await result.user.updateProfile({ emailVerified: true });
    }
    
    // Redirect to homepage
    window.location = "/";
    
  } catch (error) {
    console.error(error);
  }
}

export default handleGoogleAuth;