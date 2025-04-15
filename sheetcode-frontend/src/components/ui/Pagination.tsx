type PaginationProps = {
    currentPage: number;
    totalItems: number;
    paginate: (pageNumber: number) => void;
    itemsPerPage: number;
  };
  
  const Pagination = ({
    currentPage,
    totalItems,
    paginate,
    itemsPerPage,
  }: PaginationProps) => {
    const pageNumbers: number[] = Array.from(
      { length: Math.ceil(totalItems / itemsPerPage) },
      (_, i) => i + 1
    );
  
    return (
      <div className="flex items-center justify-between bg-[#3C3C3C] p-4 rounded-lg shadow-md mt-6">
        {/* Previous Button */}
        <button
          onClick={() => paginate(currentPage - 1)}
          className={`${
            currentPage <= 1 ? "bg-gray-500 cursor-not-allowed" : "bg-[#6D4C41] hover:bg-[#8D6E63]"
          } text-white px-4 py-2 rounded-lg transition duration-200`}
          disabled={currentPage <= 1}
        >
          Prev
        </button>
  
        {/* Page Numbers */}
        <ul className="flex space-x-2">
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => paginate(number)}
                className={`${
                  currentPage === number
                    ? "bg-[#388E3C] text-white"
                    : "bg-[#4CAF50] text-white hover:bg-[#388E3C]"
                } px-4 py-2 rounded-lg transition duration-200`}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
  
        {/* Next Button */}
        <button
          onClick={() => paginate(currentPage + 1)}
          className={`${
            currentPage >= pageNumbers.length
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-[#6D4C41] hover:bg-[#8D6E63]"
          } text-white px-4 py-2 rounded-lg transition duration-200`}
          disabled={currentPage >= pageNumbers.length}
        >
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;
  