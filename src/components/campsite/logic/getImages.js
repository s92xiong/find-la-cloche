import { storage } from "../../../firebase";

const getImages = async (match, setImgURLs) => {
  // Initialize empty array that will eventually contain promises
  const promiseArray = [];

  // Acccess the desired image directory and list all of its contents
  const ref = await storage.ref("/images").child(match.params.id).listAll();

  // Iterate through every img file and asynchronously get its URL
  for (const img of ref.items) {
    const promiseURL = img.getDownloadURL();
    promiseArray.push(promiseURL);
  }

  // Await for all promises (in the for loop) to be completed and store it in a variable
  const result = await Promise.all(promiseArray);

  // Iterate through the result
  const imgArray = result.map((url, i) => {
    return {
      urlString: url,
      display: (i === 0) ? true : false
    };
  });

  // Update state to display images
  setImgURLs(imgArray);
};

export default getImages;