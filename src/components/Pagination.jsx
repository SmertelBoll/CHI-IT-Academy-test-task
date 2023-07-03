import React, { useEffect, useState } from "react";

function Pagination({ numberOfPages, currentPage, setCurrentPage }) {
  const [moreThanNine, setMoreThanNine] = useState(false);
  useEffect(() => {
    if (numberOfPages < 9) setMoreThanNine(false);
    else setMoreThanNine(true);
  }, [numberOfPages]);

  return (
    <div className="pagination">
      {moreThanNine ? (
        <>
          {currentPage > 4 && (
            <>
              <div className={"pagination__page-circle"} onClick={() => setCurrentPage(1)}>
                {1}
              </div>
              <div className={"pagination__page-circle-points"}>...</div>
            </>
          )}

          {currentPage < 5 ? (
            <>
              {Array(7)
                .fill(0)
                .map((el, index) => (
                  <div
                    className={`pagination__page-circle ${
                      index + 1 === currentPage && "pagination__page-circle-active"
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                    key={index}
                  >
                    {index + 1}
                  </div>
                ))}
            </>
          ) : currentPage > numberOfPages - 4 ? (
            <>
              {Array(7)
                .fill(0)
                .map((el, index) => (
                  <div
                    className={`pagination__page-circle ${
                      index === 6 - (numberOfPages - currentPage) && "pagination__page-circle-active"
                    }`}
                    onClick={() => setCurrentPage(numberOfPages + index - 6)}
                    key={index}
                  >
                    {numberOfPages + index - 6}
                  </div>
                ))}
            </>
          ) : (
            <>
              <div className={"pagination__page-circle"} onClick={() => setCurrentPage(currentPage - 2)}>
                {currentPage - 2}
              </div>
              <div className={"pagination__page-circle"} onClick={() => setCurrentPage(currentPage - 1)}>
                {currentPage - 1}
              </div>
              <div
                className={"pagination__page-circle pagination__page-circle-active"}
                onClick={() => setCurrentPage(currentPage)}
              >
                {currentPage}
              </div>
              <div className={"pagination__page-circle"} onClick={() => setCurrentPage(currentPage + 1)}>
                {currentPage + 1}
              </div>
              <div className={"pagination__page-circle"} onClick={() => setCurrentPage(currentPage + 2)}>
                {currentPage + 2}
              </div>
            </>
          )}

          {currentPage < numberOfPages - 3 && (
            <>
              <div className={"pagination__page-circle-points"}>...</div>
              <div className={"pagination__page-circle"} onClick={() => setCurrentPage(numberOfPages)}>
                {numberOfPages}
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {Array(numberOfPages)
            .fill(0)
            .map((el, index) => (
              <div
                className={`pagination__page-circle ${
                  index + 1 === currentPage && "pagination__page-circle-active"
                }`}
                onClick={() => setCurrentPage(index + 1)}
                key={index}
              >
                {index + 1}
              </div>
            ))}
        </>
      )}
    </div>
  );
}

export default Pagination;
