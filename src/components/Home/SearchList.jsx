import React, { useEffect, useState } from 'react';
import "./styles/SearchList.css";
import useKeyPress from './useKeypress';

function SearchList({ campsites, showCampsiteList }) {

  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const enterPress = useKeyPress("Enter");

  const [activeIndex, setActiveIndex] = useState();

  const handleMouseEnter = (index) => {
    const handler = () => {
      setActiveIndex(index);
    };
    return handler;
  };

  useEffect(() => {
    if (downPress && !activeIndex) {
      return setActiveIndex(0);
    } else if (downPress && activeIndex) {
      return setActiveIndex(() => activeIndex + 1);
    } else if (downPress && activeIndex === 0) {
      return;
    }
  }, [downPress, activeIndex]);

  useEffect(() => {
    if (upPress && !activeIndex) {
      return;
    } else if (upPress && activeIndex) {
      return setActiveIndex(() => activeIndex - 1);
    } else if (upPress && activeIndex > campsites.length) {
      return;
    }
  }, [upPress, campsites, activeIndex]);

  useEffect(() => {
    if (enterPress && !activeIndex) {
      console.log("Pressed the enter key");
    }
  }, [enterPress, activeIndex]);

  useEffect(() => {
    if (!showCampsiteList) setActiveIndex(null);
  }, [showCampsiteList]);

  if (campsites.length < 1) return <></>;
  return (
    <div className={
      (showCampsiteList) ? "search-list" : "search-list search-list-off"
    }>
      <ul>
        {
          campsites.map((campsite, index) => (
            <li 
              className={ (activeIndex === index) ? "search-item-hover" : "search-item" }
              key={campsite.id}
              onMouseEnter={handleMouseEnter(index)}
            >
              {campsite.name}
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default SearchList;