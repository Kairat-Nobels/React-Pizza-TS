import React from 'react'
import ReactPaginate from 'react-paginate'
function Pagination({ currentPage, onChangePage })
{
  return (
    <>
      <ReactPaginate
        className='pagination'
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(e) => onChangePage(e.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={currentPage - 1}
        renderOnZeroPageCount={null}
      />
    </>
  )
}

export default Pagination 