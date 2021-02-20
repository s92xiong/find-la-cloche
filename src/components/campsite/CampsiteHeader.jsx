import React from 'react';
import "./styles/CampsiteHeader.css";

function CampsiteHeader({ item }) {
  return (
    <div className="campsite-header campsite-header-no-image">
      <h2 className="campsite-title">{item.name}</h2>
    </div>
  );
}

export default CampsiteHeader;