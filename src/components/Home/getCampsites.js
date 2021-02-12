import { firestore } from "../../firebase";

const getCampsites = (campsites, setCampsites) => {
  if (campsites.length < 1) {
    return firestore.collection("campsites").orderBy("index").onSnapshot(snapshot => {
      const newCampsites = snapshot.docs.map(doc => ({
        id: doc.id,
        hover: false,
        ...doc.data(),
      }));
      setCampsites(newCampsites);
    });
  }
};

export default getCampsites;