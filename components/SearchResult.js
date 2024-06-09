import Link from "next/link";
import react, { useEffect } from "react";

const SearchResult = (props) => {
  const { data, type } = props;
  const color = ["#2ce574", "#cdf03a", "#ffe500", "#ff9600", "#ff3924"];
  const imageUrl = `https://www.themoviedb.org/t/p/original`;

  const redirectType = (type) => {
    if (type === "movies")
      return `/${type + "/" + data?.id}/-${data?.title?.toLowerCase()?.replaceAll(" ", "_")?.replaceAll(":", "")}`;
    return `/${type + "/" + data?.id}/`;
  };
  const generateImageUrl = (url) => {
    if (!url) return "/user.png";

    let fullUrl = imageUrl + url;
    fullUrl = fullUrl.replaceAll(" ", "%20");

    return fullUrl;
    }

  return (
    <div className="mb-5">
     <Link
        href={redirectType(type)}
      >
      <div className="flex box-shadow border-[1px] border-[#374151] rounded-[8px] gap-[12px]">
        <img
          className="lazy-load-image max-w-[120px] rounded-l-[8px] object-cover	"
          src={generateImageUrl(data?.backdrop_path)}
          alt=""
        />
        <div className="p-[20px]">
          <h3 className="font-bold text-xl">{data?.title || data?.name}</h3>
          <div className="flex gap-[4px] text-sm items-center font-bold">
            <span>{data?.release_date || data?.first_air_date}</span>
          </div>
          <p className="text-sm my-[12px] text-overflow-ellipsis">{data?.overview}</p>
        </div>
      </div>
      </Link>
      </div>
  );
};

export default SearchResult;
