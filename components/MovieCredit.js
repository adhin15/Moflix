import react, { useEffect, useState } from "react";
import Link from "next/link";

const MovieCredit = (props) => {
  const { data } = props;
  const [userHasScrolled, setUserHasScrolled] = useState(false);
  const [acceptTos, setAcceptTos] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);

  return (
    <>
      <div
        className="mr-4 relative  "
        style={{ overflowWrap: "break-word" }}
      >
        <Link href={`/${data?.media_type === "tv" ? "tv-series" : "movie"}/${data?.id}`}>
          <div className="w-full min-w-[150px] min-h-[225px] ">
            <img
              className="w-full min-h-[225px] object-cover rounded object-position lazy-load-image"
              src={`https://www.themoviedb.org/t/p/original${data?.poster_path}`}
              alt=""
            />
          </div>
          <h2 className="pt-2 text-center">{data.title}</h2>
            <p className="text-center">as</p>
          <h3 className="pb-2 text-center font-bold">
            {data.character}
          </h3>
        </Link>
      </div>
    </>
  )
}

export default MovieCredit;
