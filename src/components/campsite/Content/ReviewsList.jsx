import React, { useEffect, useState } from 'react';
import { firestore } from '../../../firebase';
import { FaStar } from 'react-icons/fa';
import "./styles/ReviewsList.css";

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
            <div className="review-container">
              <div className="review-user-info">
                <img src={item.photoURL} alt=""/>
                <div className="user-review-date">
                  <h4>{item.name}</h4>
                  <div>
                    <div className="user-star-container">
                      {
                        // Temporary star location
                        [...Array(item.rating)].map((star, i) => {
                          return (
                            <FaStar key={i} size={20} className="user-star-review" />
                          )
                        })
                      }  
                    </div>
                    <p>{item.date}</p>
                  </div>
                </div>
              </div>
              <p className="review-body">{item.text}</p>
            </div>
          );
        })
      }
    </div>
  );
}

export default ReviewsList;