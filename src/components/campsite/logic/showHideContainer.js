const hideContainer = () => {
  // Hide scroll bar
  const campsiteContainer = document.querySelector(".campsite-container");
  campsiteContainer.style.height = "0px";
  campsiteContainer.style.overflowY = "hidden";    
};

const showContainer = () => {
  // Return scroll functionality to normal
  const campsiteContainer = document.querySelector(".campsite-container");
  campsiteContainer.style.height = "auto";
  campsiteContainer.style.overflowY = "auto";
};

export {
  hideContainer,
  showContainer
};