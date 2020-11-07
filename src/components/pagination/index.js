const Pagination = (props) => {
  const { cardsPerPage, totalCards, paginate, currentPage } = props;

  const pages = Math.ceil(totalCards / cardsPerPage);

  return (
    <div className="pagination-box">
      <div className="w-30 p-10 pl-20">
        {currentPage >= 1 && (
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1 ? true : false}
            className="btn-control"
          >
            Previous
          </button>
        )}
      </div>
      <div className="w-30 align-center p-10">
        <button className="btn-active">{currentPage}</button>
        <span className="pagess"> of {pages}</span>
      </div>
      <div className="w-30 align-right p-10 pr-20">
        {currentPage < pages ? (
          <button
            onClick={() => paginate(currentPage + 1)}
            className="btn-control"
          >
            Next &#62;
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Pagination;
