import React from 'react';
import { FaStar } from 'react-icons/fa';

function HalfStar() {
  return (
    <div className="full-star-container">
      <div className="half-star-container">
        <FaStar size={20} color="ffb400" className="left-half-star" />
      </div>
      <div className="half-star-container">
        <FaStar size={20} color="#f1f1f1" className="right-half-star" />
      </div>
    </div>
  )
}

export default HalfStar;