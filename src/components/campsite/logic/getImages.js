import { storage } from "../../../firebase";

const getImages = async (match, setImgURLs) => {
  const tempArray = [];
  const ref = await storage.ref("/images").child(match.params.id).listAll();

  for (let i = 0; i < ref.items.length; i++) {
    const url = await ref.items[i].getDownloadURL();
    tempArray.push({
      urlString: url,
      display: (i === 0) ? true : false,
    });
  }
  // console.table(tempArray);
  setImgURLs(tempArray);
};

export default getImages;

// for (const file of ref.items) {
//   const url = await file.getDownloadURL();
//   tempArray.push({
//     urlString: url,
//     display: false,
//   });
// }