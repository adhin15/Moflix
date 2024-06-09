import Link from "next/link";

const CastHeaderSkeleton = () => {
  return (
    <>
      <div className="w-[58px] h-[87px] bg-[#334155] animate-pulse rounded" />
      <div className="flex flex-col text-left	">
        <h3 className="text-2xl font-bold w-[100px] h-[24px] bg-[#334155] animate-pulse rounded"></h3>
        <button className="text-left flex items-center gap-[8px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
          <Link href={"javascript:history.go(-1)"}>back</Link>
        </button>
      </div>
    </>
  );
};

export default CastHeaderSkeleton;
