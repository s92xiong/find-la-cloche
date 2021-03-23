import { firestore } from "../../firebase";

const getCampsites = (mutableCampsites, setMutableCampsites, setImmutableCampsites) => {
  if (mutableCampsites.length < 1) {
    return firestore.collection("campsites").orderBy("index").onSnapshot(snapshot => {
      const newCampsites = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMutableCampsites(newCampsites);
      if (!setImmutableCampsites) return;
      setImmutableCampsites(newCampsites);
    });
  }
};

export default getCampsites;