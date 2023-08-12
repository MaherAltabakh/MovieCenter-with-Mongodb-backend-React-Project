import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
const Pagination = ({
  moviesCount,
  moviesInPage,
  currentPage,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(moviesCount / moviesInPage);
  if (pagesCount <= 1 && currentPage === 1) return null; //we add
  const pages = _.range(1, pagesCount + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            style={{ cursor: "pointer" }}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  moviesCount: PropTypes.number.isRequired,
  moviesInPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
