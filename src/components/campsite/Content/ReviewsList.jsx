import React, { useEffect, useState } from 'react';
import { firestore } from '../../../firebase';

function ReviewsList({ match }) {

  const [list, setList] = useState(null);

  const getReviews = async () => {
    if (list) return;
    const snapshot = await firestore.collection('campsites').doc(match.params.id).get();
    const data = snapshot.data();
    setList(data.reviews);
    console.log(data.reviews);
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