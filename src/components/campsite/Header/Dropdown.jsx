import React, { useState } from 'react';
import iconImg from "../../../images/search-icon.png";
import downArrow from "../../../images/arrow-down.png";
import OutsideClickHandler from 'react-outside-click-handler';
import { Link } from 'react-router-dom';
import "./styles/Dropdown.css";

function Dropdown({ campsites }) {

  const [isDropDownOpen, setDropDownOpen] = useState(false);
  const openDropDown = () => setDropDownOpen(!isDropDownOpen);
  const closeDropDown = () => setDropDownOpen(false);

  return (
    <div className="right-side-header">
      <OutsideClickHandler onOutsideClick={closeDropDown}>
        <div 
          className={ (!isDropDownOpen) ? "drop-down-header noselect" : "drop-down-header noselect dd-bb-radius" } 
          onClick={openDropDown}
        >
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
    </div>
  );
}

export default Dropdown;