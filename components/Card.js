import Link from "next/link";
import react, { useEffect } from "react";

const Card = (props) => {
  const { data, type } = props;
  const color = ["#2ce574", "#cdf03a", "#ffe500", "#ff9600", "#ff3924"];
  const bgcolor = (value) => {
    if (value >= 80 && value <= 100) {
      return color[0];
    } else if (value >= 60 && value < 80) {
      return color[1];
    } else if (value >= 40 && value < 60) {
      return color[2];
    } else if (value >= 20 && value < 40) {
      return color[3];
    } else if (value >= 0 && value < 20) {
      return color[4];
    }
  };
  const circle = () => {
    var circle = document.getElementById(`circle ${data.id}`);
    var radius = circle.r.baseVal.value;
    var circumference = radius * 2 * Math.PI;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}` - (data?.vote_average / 10) * circumference;
  };

  const redirectType = (type) =>{
    if(type === "movies") return `/${type + "/" + data?.id}/-${data?.title?.toLowerCase()?.replaceAll(" ", "_")?.replaceAll(":", "")}`
    return `/${type + "/" + data?.id}/`
  }

  useEffect(() => {
    circle();
  }, [data]);
  return (
    <div className="mr-4 max-w-[150px] relative">
      <Link
        href={redirectType(type)}
      >
        <div className="w-full min-w-[150px] min-h-[225px]  h-full">
          <img
            className="w-full h-full min-h-[225px] object-cover rounded object-position lazy-load-image"
            src={`https://www.themoviedb.org/t/p/original${data?.backdrop_path}`}
            alt=""
          />
        </div>
        <div className="relative" style={{ left: 0, bottom: "-19px" }}>
          <p className="text-[10px] py-4 px-3 absolute" style={{ left: -1, bottom: -2, zIndex: 1 }}>
            {Math.round(data.vote_average * 10)}%
          </p>
          <div className="w-full">
            <svg
              className="absolute"
              width="40"
              height="40"
              style={{ color: bgcolor(data.vote_average * 10), left: 0, bottom: "2px" }}
            >
              <circle
                id={`circle ${data.id}`}
                // className="progress-ring__circle"
                stroke={bgcolor(data.vote_average * 10)}
                strokeWidth="2"
                fill="#001D3D"
                r="16"
                cx="20"
                cy="20"
                width={34}
                height={34}
              />
            </svg>
          </div>
        </div>
        <h2 className="mt-5 font-bold">{data.title || data.name}</h2>
        <p className="font-normal opacity-50">{data.release_date || data.first_air_date}</p>
      </Link>
    </div>
  );
};

export default Card;
