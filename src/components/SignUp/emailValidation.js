function emailIsValid(email) {
  return /\S+@\S+\.\S+/.test(email);
}

export default emailIsValid;