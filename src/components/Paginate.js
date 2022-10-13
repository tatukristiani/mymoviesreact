import ReactPaginate from "react-paginate";
import '../styles/Paginate.css';
import React from "react";

/**
 * Paginate for the movies.
 * @param onPageChange event that is passed on the ReactPaginate component.
 * @returns {JSX.Element} ReactPaginate component with some hardcoded attributes except the onPageChange.
 * @constructor Creates Paginate component which is really a Reacts ReactPaginate.
 */
const Paginate = ({onPageChange}) => {

    return (
        <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            pageCount={7}
            marginPagesDisplayed={3}
            pageRangeDisplayed={4}
            onPageChange={onPageChange}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}
        />
    )
}

export default Paginate;