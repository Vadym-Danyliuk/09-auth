import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

import { RiSkipBackFill, RiSkipForwardFill } from 'react-icons/ri';

interface PaginationProps {
  totalPages: number;
  onChange: (page: number) => void;
  page: number;
}

const Pagination = ({ totalPages, onChange, page }: PaginationProps) => {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      onPageChange={({ selected }) => onChange(selected + 1)}
      forcePage={page - 1}
      renderOnZeroPageCount={null}
      nextLabel={<RiSkipForwardFill />}
      previousLabel={<RiSkipBackFill />}
    />
  );
};

export default Pagination;
