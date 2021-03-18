import React from 'react';

const Pagination = ({ amountPages, onClickPages, currentPage }) => {
  let pages = [];
  for (let i = 1; i <= amountPages; i++) {
    pages.push(i);
  }
  return (
    <div className='page-numbers'>
      <ul className={''}>
        {pages.map((page) => {
          return (
            <li key={page}>
              <button
                onClick={(e) => onClickPages(e, page)}
                className={currentPage === page ? 'active' : ''}
              >
                {page}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;
