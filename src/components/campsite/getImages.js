import { storage } from "../../firebase";

const getImages = async (match, setImgURLs) => {
  const tempArray = [];
  const ref = await storage.ref("/images").child(match.params.id).listAll();
  for (const file of ref.items) {
    const url = await file.getDownloadURL();
    tempArray.push({
      urlString: url,
      display: false,
    });
  }
  // console.log(tempArray);
  setImgURLs(tempArray);
};

export default getImages;