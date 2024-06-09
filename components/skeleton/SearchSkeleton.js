

const SearchSkeleton = () =>{
    return(
        <div className="animate-pulse flex box-shadow border-[1px] border-[#374151] rounded-[8px] gap-[12px] mb-5 h-[152px]">
        <img
          className="w-[120px] rounded-l-[8px] object-cover	bg-[#334155]"
          src=""
          alt=""
        />

        {/* <div className="p-[20px]">
          <h3 className="font-bold text-xl">-</h3>
          <div className="flex gap-[4px] text-sm items-center font-bold">
            <span>-</span>
          </div>
          <p className="text-sm my-[12px] text-overflow-ellipsis">-</p>
        </div> */}
      </div>
    )
}

export default SearchSkeleton;