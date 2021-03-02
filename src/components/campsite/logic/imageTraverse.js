const imageTraverse = (direction, imgURLs, setImgURLs, imgIndex, setImgIndex) => {

  if (imgIndex === 0 && direction === "reverse") {
    return;
  } else if (imgIndex === imgURLs.length - 1 && direction === "forward") {
    return;
  }

  const newImgURLs = [...imgURLs];
  newImgURLs[imgIndex].display = false;
  
  let newIndex = imgIndex;

  if (direction === "reverse") {
    newImgURLs[imgIndex - 1].display = true;
    newIndex--;
  } else if (direction === "forward") {
    newImgURLs[imgIndex + 1].display = true;
    newIndex++;
  }

  setImgURLs(newImgURLs);
  setImgIndex(newIndex);
};

export default imageTraverse;