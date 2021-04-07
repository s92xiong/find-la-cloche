import React from 'react';
import { FaStar } from 'react-icons/fa';

function AverageRating({ average, starSize }) {

  // Container size for the "Half Star" must be 1/2 the size of a Full Star
  const halfContainerSize = starSize / 2;

  const halfStarContainerStyle = {
    position: "relative",
    float: "left",
    width: `${halfContainerSize}px`,
    height: `${starSize}px`, // Container height == Star height
    overflow: "hidden", // Hide anything outside of the container
  };

  const halfStarStyle = {
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
  };

  // If there is NO average (no reviews), render 5 grey stars
  if (!average) {
    return (
      <div style={{ display: "flex" }}>
        {
          [...Array(5)].map((star, i) => {
            return (
              <div key={i}>
                <FaStar size={starSize} color="#f1f1f1" />
              </div>
            );
          })
        }
      </div>
    );
  }

  // If there is an average (reviews exist), render the average rating
  return (
    <div style={{ display: "flex" }}>
      {
        [...Array(5)].map((star, i) => {
          // Return a "Half Star" given the following condition
          if (average === i + 0.5) {
            return (
              <div>
                <div style={halfStarContainerStyle}>
                  <FaStar size={starSize} color="gold" style={ {...halfStarStyle, left: "100%"} } />
                </div>
                <div style={halfStarContainerStyle}>
                  <FaStar size={starSize} color="#f1f1f1" style={ {...halfStarStyle, left: "0%" }} />
                </div>
              </div>
            );
          }
          // Return "Gold Star" if the index is less than the average
          if (i < average) {
            return (
              <div>
                <FaStar size={starSize} color="gold" />
              </div>
            );
          } else {
            // Return a "Grey Star" if the index is greater than the average
            return (
              <div>
                <FaStar size={starSize} color="#f1f1f1" />
              </div>
            );
          }
        })
      }
    </div>
  );
}

export default AverageRating;