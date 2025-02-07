import React from 'react';

const Pagination = ({ currentPage, totalPages, onPrev, onNext }) => {
  return (
    <div className='pagination'>
      <button disabled={currentPage === 1} onClick={onPrev}>
        Prev
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button disabled={currentPage === totalPages} onClick={onNext}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
