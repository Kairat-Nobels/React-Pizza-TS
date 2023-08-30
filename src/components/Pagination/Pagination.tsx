import React from 'react'
import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.css'

type PaginationProps = { currentPage: number, onChangePage: (page: number) => void }

const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage }) => {
  return (
    <>
      <ReactPaginate
        className={styles.pagination}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(e) => onChangePage(e.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={currentPage - 1}
      />
    </>
  )
}

export default Pagination 