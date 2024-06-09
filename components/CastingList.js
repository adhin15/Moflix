import react, { useEffect, useState } from "react";
import Link from "next/link";

const CastingList = (props) => {
  const { data } = props;
  const [userHasScrolled,setUserHasScrolled] = useState(false)
  const [acceptTos,setAcceptTos] = useState(false)
  const [scrollPos,setScrollPos] = useState(0)


  return (
    <>
      <div className="mr-4 relative border rounded border-[#001d3d] box-shadow max-w-[150px] h-full" style={{overflowWrap:"break-word"}}>
        <Link href={`/person/${data?.id}`}>
          <div className="w-full min-w-[150px] min-h-[225px] ">
            <img
              className="w-[99%] min-h-[225px] object-cover rounded object-position lazy-load-image"
              src={`https://www.themoviedb.org/t/p/original${data?.profile_path}`}
              alt=""
            />
          </div>
          <div className="relative" style={{ left: 0, bottom: "-19px" }}>
            <p className="text-[10px] py-4 px-3 absolute" style={{ left: -1, bottom: -1, zIndex: 1 }}>
              {/* {Math.round(data.vote_average * 10)}% */}
            </p>
          </div>
          <h2 className="mt-5 font-bold px-2">{data.name}</h2>
          <p className="font-normal opacity-50 text-[12px] p-2">{data.character}</p>
      </Link>
      </div>
    </>
  );
};

export default CastingList;
