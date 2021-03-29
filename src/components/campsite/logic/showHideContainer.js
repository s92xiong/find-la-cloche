const hideContainer = () => {
  // Hide scroll bar
  const campsiteContainer = document.querySelector(".campsite-container");
  campsiteContainer.style.height = "calc(100vh - 120px)"; // 120px prevents scrolling on most window sizes
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