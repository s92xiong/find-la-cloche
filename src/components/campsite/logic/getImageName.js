function getImageName(array) {
  let newArray = [];
  for (const item of array) {
    newArray.push(item.name);
  }
  return newArray;
}

export default getImageName;