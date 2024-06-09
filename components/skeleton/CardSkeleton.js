import react from "react";

const CardSkeleton = (props) => {
  const { data } = props;
  return (
    <>
    <div className="w-full min-w-[150px] min-h-[225px] h-[225px] mr-4 box-shadow">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded bg-slate-700 min-h-[225px] w-full"></div>
      </div>
    </div>
    </>
  );
};

export default CardSkeleton;
