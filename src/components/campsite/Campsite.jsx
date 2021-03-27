import React, { useEffect, useState } from 'react';
import "./Campsite.css";
import { firestore } from '../../firebase';
import getCampsites from '../Home/getCampsites';
import Header from './Header/Header';
import Card from './Card/Card';
import ActionBar from './ActionBar/ActionBar';

function Campsite({ match }) {
  // Initialize array of campsites
  const [campsites, setCampsites] = useState([]);

  // For the currently active campsite
  const [item, setItem] = useState();

  // Access document of the campsite you are currently viewing
  const getCampsiteDoc = async (id) => {
    const snapshot = await firestore.collection('campsites').doc(id).get();
    const data = snapshot.data();
    setItem(data);
  };

  useEffect(() => {
    getCampsites(campsites, setCampsites, null);
    getCampsiteDoc(match.params.id);
  }, [match, campsites]);

  return (
    <div className="campsite-page">
      <div className="campsite-container">
        <Header campsites={campsites} />
        <Card 
          match={match}
          item={item}
        />
        <ActionBar
          match={match}
          item={item}
          setItem={setItem}
        />
      </div>
    </div>
  );
}

export default Campsite;