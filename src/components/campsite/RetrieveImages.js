import { storage } from "../../firebase";

const retrieveImages = async (match, URLs, setURLs) => {

  if (URLs.length > 1) return;

  const tempArray = [];
  const ref = await storage.ref("/images").child(match.params.id).listAll();
  // ref.items.forEach(async(file) => {
  //   const url = await file.getDownloadURL();
  //   tempArray.push(url);
  //   console.log(tempArray);
  // });
  // Second option to iterate through loop
  for (const file of ref.items) {
    const url = await file.getDownloadURL();
    tempArray.push(url);
    console.log(tempArray);
  }
  setURLs(tempArray);
};

export default retrieveImages;