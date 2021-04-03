function CatchLogInError(error, value, setInputError, setLogInFailed) {
  if (error.code === "auth/invalid-email" && value.email.length < 1 && value.password.length < 1) {
    // Highlight both email and password boxes in red to indicate they are invalid (not filled in)
    setInputError({
      email: true, 
      password: true,
    });
  } else if (error.code === "auth/invalid-email" && value.password.length > 6) {
    // If the email is invalid but the password input is filled in (valid), highlight email box in red
    setInputError({
      email: true, 
      password: false,
    });
  } else if (error.code === "auth/wrong-password" && value.email.length > 1 && value.password.length < 6) {
    // If the email is correctly filled in but the password is not valid, highlight password box in red
    setInputError({
      email: false, 
      password: true,
    });
  } else if (error.code === "auth/wrong-password" && value.password.length > 6) {
    // Wrong passord causes log-in failure
    setLogInFailed(true);
  } else {
    // Wrong email (not in db) causes log-in failure
    setLogInFailed(true);
  }
}

export default CatchLogInError;