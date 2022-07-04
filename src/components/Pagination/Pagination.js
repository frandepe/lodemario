import React from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import "./Pagination.scss";
const Pagination = ({
  setCurrentPage,
  currentPage,
  postsPerPage,
  totalPosts,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };
  // le podria poner un math max para q no se me desmadre si hay muchas paginas
  // arreglar: limites de paginas
  return (
    <div className="Pagination__container">
      <ul className="pagination">
        <p onClick={previousPage} className="page-link">
          <MdNavigateBefore />
        </p>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <p onClick={() => paginate(number)} className="page-link">
              {number}
            </p>
          </li>
        ))}
        <p onClick={nextPage} className="page-link">
          <MdNavigateNext />
        </p>
      </ul>
    </div>
  );
};

export default Pagination;
