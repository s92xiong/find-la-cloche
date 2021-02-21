import React from 'react';
import iconImg from "../../images/search-icon.png";

function SelectCampsite({ campsites, url, setURL }) {
  return (
    <form className="right-side-header">
      <select name="select-campsite" className="select-campsite-header">
        <option value="" defaultValue>-- Select another campsite --</option>
        {
          campsites.map((campsite) => {
            return (
              <option value={campsite.name} key={campsite.id}>{campsite.name}</option>
            );
          })
        }
      </select>
      <div className="confirm-selected-campsite">
        <img className="search-icon-header" src={iconImg} alt=""/>
      </div>
    </form>
  );
}

export default SelectCampsite;