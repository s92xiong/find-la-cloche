const moveIndex = (direction, imgURLs, imgIndex, setImgIndex, setImgURLs) => {
  let value;

  if (direction === "left") {
    value = -1;
  } else if (direction === "right") {
    value = 1;
  }

  const array = [...imgURLs];
  array.forEach(item => (item.display) ? item.display = false : null);
  array[imgIndex + value].display = true;
  setImgIndex(imgIndex + value);
  return setImgURLs(array);
};

export default moveIndex;