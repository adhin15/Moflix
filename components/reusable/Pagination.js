const Pagination = (props) => {
  const { totalPages, currentPage,setPage } = props;
  return (
      <div>
        {[...Array(totalPages)].map((page, i) => {
          return (
            <span className={`px-2 cursor-pointer hover:opacity-75 ${currentPage == i + 1 ? "bg-[#012459]" : ""}`}
                onClick={()=>{setPage(i+1)}}
            >
              {i + 1}
            </span>
          );
        })}
      </div>
  );
};

export default Pagination;
