const DetailSkeleton = () => {
  return (
    <>
      <div className={`flex-none w-1/3 max-w-[300px] rounded-lg overflow-hidden	`}>
        <div className="w-full min-w-[150px] min-h-[450px]  mr-4">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded bg-slate-700 min-h-[450px] w-full"></div>
          </div>
        </div>
      </div>
      <div className={`w-2/3 max-h-full rounded-lg overflow-hidden px-8 flex flex-col justify-center`}>
        <h2 className="text-4xl my-2 animate-pulse ">
          <div className="rounded bg-slate-700 min-h-[40px] w-full"></div>
        </h2>

        <div className="my-2 animate-pulse">
          <div className="rounded bg-slate-700 min-h-[24px] w-[336px]"></div>
        </div>

        <div className="my-2 animate-pulse">
          <div className="rounded bg-slate-700 min-h-[24px] w-[352px]"></div>
        </div>

        <div className="my-2 animate-pulse">
          <div className="rounded bg-slate-700 min-h-[24px] w-full"></div>
        </div>
        <div className="my-2 animate-pulse">
          <div className="rounded bg-slate-700 min-h-[24px] w-[100px]"></div>
        </div>
        <div className="animate-pulse">
          <div className="rounded bg-slate-700 min-h-[24px] w-full"></div>
        </div>
      </div>
    </>
  );
};

export default DetailSkeleton;
