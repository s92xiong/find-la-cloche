function round(value, step) {
  step || (step = 1.0);
  const inv = 1.0 / step;
  return Math.round(value * inv) / inv;
}

function calcAvgRating(item) {
  // Cancel if campsite item doesn't exist
  if (!item) return;

  const reviewsList = item.reviews;

  let average;
  let sum = 0;
  for (const obj in reviewsList) {
    sum += reviewsList[obj].rating;
  }

  average = sum / reviewsList.length;
  if (average) return round(average, 0.5);
}

export default calcAvgRating;