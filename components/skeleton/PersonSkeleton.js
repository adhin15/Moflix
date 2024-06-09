export const PersonLeftSkeleton = () => {
  return (
    <>
      <div className={`flex-none rounded-lg overflow-hidden	`}>
        <div className="w-full min-w-[150px] min-h-[450px]  mr-4">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded bg-slate-700 min-h-[450px] w-full"></div>
          </div>
        </div>
      </div>

      <div className={`rounded-lg overflow-hidden flex flex-col justify-center`}>
        <div className="my-2 animate-pulse w-[90px]">
          <div className="rounded bg-slate-700 min-h-[30px] w-full"></div>
        </div>

        <div className="mt-2 animate-pulse w-[80px]">
          <div className="rounded bg-slate-700 h-[24px] w-full"></div>
        </div>
        <div className="mt-2 animate-pulse w-[60px]">
          <div className="rounded bg-slate-700 min-h-[24px] w-full"></div>
        </div>

        <div className="mt-2 animate-pulse w-[80px]">
          <div className="rounded bg-slate-700 min-h-[24px] w-full"></div>
        </div>
        <div className="mt-2 animate-pulse w-[60px]">
          <div className="rounded bg-slate-700 min-h-[24px] w-full"></div>
        </div>

        <div className="mt-2 animate-pulse w-[80px]">
          <div className="rounded bg-slate-700 min-h-[24px] w-full"></div>
        </div>
        <div className="mt-2 animate-pulse w-[60px]">
          <div className="rounded bg-slate-700 min-h-[24px] w-full"></div>
        </div>

        <div className="mt-2 animate-pulse w-[80px]">
          <div className="rounded bg-slate-700 min-h-[24px] w-full"></div>
        </div>
        <div className="mt-2 animate-pulse w-[140px]">
          <div className="rounded bg-slate-700 min-h-[24px] w-full"></div>
        </div>

        <div className="mt-2 animate-pulse w-[80px]">
          <div className="rounded bg-slate-700 min-h-[24px] w-full"></div>
        </div>
        <div className="mt-2 animate-pulse w-[200px]">
          <div className="rounded bg-slate-700 min-h-[24px] w-full"></div>
        </div>

        <div className="mt-2 animate-pulse w-[80px]">
          <div className="rounded bg-slate-700 min-h-[24px] w-full"></div>
        </div>
        <div className="mt-2 animate-pulse w-[190px]">
          <div className="rounded bg-slate-700 min-h-[24px] w-full"></div>
        </div>
        <div className="mt-2 animate-pulse w-[90px]">
          <div className="rounded bg-slate-700 min-h-[24px] w-full"></div>
        </div>
        <div className="mt-2 animate-pulse w-[120px]">
          <div className="rounded bg-slate-700 min-h-[24px] w-full"></div>
        </div>
      </div>
    </>
  );
};

export const PersonRightSkeleton = () => {
  return (
    <>
      <div className={`max-h-full rounded-lg overflow-hidden px-8 flex flex-col justify-center`}>
        <h2 className="text-4xl my-2 animate-pulse w-[300px]">
          <div className="rounded bg-slate-700 min-h-[40px] w-full"></div>
        </h2>

        <div className="my-2 animate-pulse w-[160px]">
          <div className="rounded bg-slate-700 min-h-[24px]"></div>
        </div>

        <div className="my-2 animate-pulse">
          <div className="rounded bg-slate-700 min-h-[24px]"></div>
        </div>

        <div className="my-2 animate-pulse">
          <div className="rounded bg-slate-700 min-h-[24px]"></div>
        </div>
        <div className="my-2 animate-pulse">
          <div className="rounded bg-slate-700 min-h-[24px]"></div>
        </div>
        <div className="my-2 animate-pulse">
          <div className="rounded bg-slate-700 min-h-[24px] "></div>
        </div>
      </div>
    </>
  );
};
