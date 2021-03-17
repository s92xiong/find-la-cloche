function getAverageReview(reviewsList) {
  let average;
  let sum = 0;

  for (const obj in reviewsList) {
    sum += reviewsList[obj].rating;
  }

  average = sum / reviewsList.length;

  if (average) {
    return round(average, 0.5);
  }
}

function round(value, step) {
  step || (step = 1.0);
  const inv = 1.0 / step;
  return Math.round(value * inv) / inv;
}


export default getAverageReview;