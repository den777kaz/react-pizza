import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

function SortPopup({ items, activeSortType, onClickSortByName }) {
  const [showPopup, setShowPopup] = useState(false);
  // const [activeItem, setActiveItem] = useState(0);
  const sortRef = useRef();
  const activeLabel = items.find((obj) => obj.type === activeSortType).name;
  const toggleShowPopup = () => {
    setShowPopup(!showPopup);
  };

  const onSelectItem = (type) => {
    // setActiveItem(index);
    onClickSortByName(type);
    setShowPopup(false);
  };

  const handleoutsideClick = (e) => {
    var path = e.path || (e.composedPath && e.composedPath());

    if (!path.includes(sortRef.current)) {
      setShowPopup(false);
    }
  };
  useEffect(() => {
    document.body.addEventListener('click', handleoutsideClick);
    return () => {
      //delete Event
    };
  }, []);
  return (
    <div ref={sortRef} className='sort'>
      <div className='sort__label'>
        <svg
          className={showPopup ? 'rotated' : ''}
          width='10'
          height='6'
          viewBox='0 0 10 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
            fill='#2C2C2C'
          />
        </svg>
        <b>Sort by:</b>
        <span onClick={toggleShowPopup}>{activeLabel}</span>
      </div>
      {showPopup && (
        <div className='sort__popup'>
          <ul>
            {items &&
              items.map((cat, i) => (
                <li
                  className={activeSortType === cat.type ? 'active' : ''}
                  onClick={() => {
                    onSelectItem(cat);
                  }}
                  key={`${cat.name}_${i}`}
                >
                  {cat.name}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

SortPopup.propTypes = {
  activeSortType: PropTypes.string.isRequired,
  onClickSortByName: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

SortPopup.defaultProps = {
  items: [],
  activeSortByName: 0,
};

export default React.memo(SortPopup);
