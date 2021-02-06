function CatchLogInError(error, value, setInputError) {
  if (error.code === "auth/invalid-email" && value.email.length < 1 && value.password.length < 1) {
    setInputError({
      emailError: true, 
      passwordError: true,
    });
  } else if (error.code === "auth/invalid-email" && value.password.length > 1) {
    setInputError({
      emailError: true, 
      passwordError: false,
    });
  } else if (error.code === "auth/wrong-password") {
    setInputError({
      emailError: false, 
      passwordError: true,
    });
  }
  
}

export default CatchLogInError;