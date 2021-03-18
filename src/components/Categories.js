import React from 'react';
import PropTypes from 'prop-types';

const Categories = ({ items, onClickCategory, activeCategory }) => {
  // const [activeItem, setActiveItem] = React.useState(activeCategory);

  // const onSelectItem = (index) => {
  //   setActiveItem(index);
  //   onClickCategory(index);
  // };

  return (
    <div className='categories'>
      <ul>
        <li
          className={activeCategory === null ? 'active' : ''}
          onClick={() => onClickCategory(null)}
        >
          All
        </li>
        {items &&
          items.map((name, i) => (
            <li
              className={activeCategory === i ? 'active' : ''}
              onClick={() => {
                onClickCategory(i);
              }}
              key={`${name}_${i}`}
            >
              {name}
            </li>
          ))}
      </ul>
    </div>
  );
};

Categories.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCategory: PropTypes.number,
  onClickCategory: PropTypes.func,
};

Categories.defaultProps = {
  items: [],
  activeCategory: null,
};

export default React.memo(Categories);
