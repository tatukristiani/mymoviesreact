import ReactPaginate from "react-paginate";
import '../styles/Paginate.css';
import {useEffect} from "react";

const Paginate = ({onPageChange}) => {

    useEffect(() => {

    },[])
    return (
        <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            pageCount={50}
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