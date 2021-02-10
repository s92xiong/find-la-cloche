import { firestore } from "../../firebase";

const getCampsites = (campsites, setCampsites) => {
  const handler = () => {
    if (campsites.length < 1) {
      firestore.collection("campsites").orderBy("index").onSnapshot(snapshot => {
        const newCampsites = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCampsites(newCampsites);
      });
    }
  };
  return handler;
}

export default getCampsites;