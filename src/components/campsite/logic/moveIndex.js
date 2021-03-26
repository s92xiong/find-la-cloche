const moveIndex = (direction, imgIndex, setImgIndex, item, setItem) => {
  let value;

  if (direction === "left") {
    value = -1;
  } else if (direction === "right") {
    value = 1;
  }

  const newItem = {...item};
  newItem.images.forEach(imgObj => (imgObj.display) ? imgObj.display = false : null);
  newItem.images[imgIndex + value].display = true;
  setImgIndex(imgIndex + value);
  return setItem(newItem);
};

export default moveIndex;