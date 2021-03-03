import React from 'react';
import "./styles/SubHeader.css";

function SubHeader() {
  return (
    <div className="sub-header">
      <div className="sub-header-title">
        <span>Reviews</span>
      </div>
      <div className="sub-header-title">
        <span>Photos</span>
      </div>
    </div>
  );
}

export default SubHeader;