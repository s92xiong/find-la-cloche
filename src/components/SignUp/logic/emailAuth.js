import { auth } from "../../../firebase";

const emailAuth = (value, inputError, setInputError, signInError, setNewAccountCreated, setEmailVerificationPopup, setAccountAlreadyInUse) => {
  const submitEmailAuth = async (e) => {
    e.preventDefault();

    // Prevent form submission if any input fields are invalid
    const areAllIputFieldsValid = signInError(value, inputError, setInputError);
    if (!areAllIputFieldsValid) return console.log("Please fill in all input fields");
  
    try {
      // Prevent useEffect from automatically redirecting to homepage upon logging in
      setNewAccountCreated(true);
  
      // Create user and automatically log in
      const userCredential = await auth.createUserWithEmailAndPassword(value.email, value.password);
      await userCredential.user.updateProfile({
        displayName: `${value.firstName} ${value.lastName}`,
      });
  
      // Add user to Firestore
      // await firestore.collection("users").add({
      //   email: value.email,
      //   reviews: [],
      //   uid: userCredential.user.uid,
      // });
  
      // Send an email verification letter to the newly registered user
      await auth.currentUser.sendEmailVerification();
  
      // Sign user out immediately, they should only be able to sign back in if they have verified their email
      await auth.signOut();
  
      // Render a pop-up div when the user has signed in
      setEmailVerificationPopup(true);
  
    } catch (error) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        setAccountAlreadyInUse(true);
      }
    }
  }
  return { submitEmailAuth };
};

export default emailAuth;