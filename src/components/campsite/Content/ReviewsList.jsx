import React, { useEffect, useState } from 'react';
import { firestore } from '../../../firebase';

function ReviewsList({ match }) {

  const [list, setList] = useState(null);

  const getReviews = async () => {
    // Only retrieve data from Firestore once
    if (list) return;

    // Retrieve reviews from Firestore, store data in "list" state
    const snapshot = await firestore.collection('campsites').doc(match.params.id).get();
    const data = snapshot.data();
    setList(data.reviews);
  };

  useEffect(() => {
    getReviews();
  })

  if (!list) return <></>;
  return (
    <div className="reviews-list">
      {
        list.map(item => {
          return (
            <li>{item.text}</li>
          );
        })
      }
    </div>
  );
}

export default ReviewsList;