import React, { useState } from 'react';
import iconImg from "../../images/search-icon.png";
import downArrow from "../../images/arrow-down.png";
import OutsideClickHandler from 'react-outside-click-handler';
import { Link } from 'react-router-dom';

function SelectCampsite({ campsites, url, setURL }) {

  const [isDropDownOpen, setDropDownOpen] = useState(false);
  const openDropDown = () => setDropDownOpen(!isDropDownOpen);
  const closeDropDown = () => setDropDownOpen(false);

  return (
    <form className="right-side-header">
      <OutsideClickHandler onOutsideClick={closeDropDown}>
        <div className="drop-down-header noselect" onClick={openDropDown}>
          <span className="drop-down-span" >Select another campsite</span>
          <img 
            className={ (!isDropDownOpen) ? "down-arrow" : "up-arrow down-arrow"} 
            src={downArrow} 
            alt=""
          />
          <ul className={ (!isDropDownOpen) ? "drop-down-ul" : "drop-down-ul drop-down-ul-open" }>
            {
              campsites.map((campsite) => {
                return (
                  <Link className="drop-down-item" key={campsite.id} to={campsite.id}>
                    <li>{campsite.name}</li>
                  </Link>
                );
              })
            }
          </ul>
        </div>
      </OutsideClickHandler>
      <div className="green-search-icon noselect">
        <img src={iconImg} alt=""/>
      </div>
    </form>
  );
}

export default SelectCampsite;