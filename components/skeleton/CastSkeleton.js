

const CastSkeleton = () => {
  return (
    <>
      <div className="flex w-full mb-8">
      <div
          className="w-[66px] h-[66px] object-cover bg-[#334155] animate-pulse rounded"
        />
        <div className="flex flex-wrap pl-10 flex-col	">
          <p className="w-full font-bold h-[20px] bg-[#334155] w-[150px] mb-2 animate-pulse rounded-lg	"></p>
          <p className="w-full w-[150px] h-[20px] bg-[#334155] mt-2 animate-pulse rounded-lg"></p>
        </div>
      </div>
    </>
  );
};

export default CastSkeleton;
