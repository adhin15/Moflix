import { useRouter } from "next/router";
import { getDetailTv, getTvCastingList, getTvKeywords } from "../../services/Getdata";
import { formatDate } from "../../services/Helper";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import CastingList from "../../components/CastingList";
import CardSkeleton from "../../components/skeleton/CardSkeleton";
import DetailSkeleton from "../../components/skeleton/DetailSkeleton";
import StarReview from "../../components/reusable/StarReview";
import Head from "next/head";
import IconContainer from "../../components/reusable/IconContainer";
import Link from "next/link";

const DetailTvSeries = () => {
  const router = useRouter();
  const { id } = router?.query;
  const imageUrl = `https://image.tmdb.org/t/p/original`;

  const [detailTv, setDetailTv] = useState(null);
  const [castingList, setCastingList] = useState(null);
  const [tvKeywords, setTvKeywords] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [castingScrolled, setCastingScrolled] = useState(false);
  const color = ["#2ce574", "#cdf03a", "#ffe500", "#ff9600", "#ff3924"];

  const circle = () => {
    var circle = document.getElementById(`circle ${detailTv?.id}`);
    var radius = circle.r.baseVal.value;
    var circumference = radius * 2 * Math.PI;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset =
      `${circumference}` - (Number(detailTv?.vote_average.toString().slice(0, 3)) / 10) * circumference;
  };

  const timeConvert = (n) => {
    const num = n;
    const hours = num / 60;
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    return rhours + "h" + " " + rminutes + "m";
  };

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

  useEffect(() => {
    if (id) {
      const query = id?.split("-")?.[0];
      setIsLoading(true);
      getDetailTv(query).then((resDetail) => {
        setDetailTv(resDetail);
        getTvCastingList(query).then((resCast) => {
          setCastingList(resCast);
          getTvKeywords(query).then((resKeyword) => {
            setTvKeywords(resKeyword);
            setIsLoading(false);
          });
        });
      });
    }
  }, [id]);
  useEffect(() => {
    if (detailTv && !isLoading) {
      console.log("log detail", detailTv);
      circle();
    }
  }, [detailTv, isLoading]);

  // useEffect(()=>{
  //   console.log('logdetail',(detailTv?.seasons?.slice(-1)[0])[0].name)
  // },[detailTv])

  const handleScroll = (e) => {
    if (e.target.scrollLeft === 0) {
      setCastingScrolled(false);
    } else {
      setCastingScrolled(true);
    }
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  return (
    <>
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
       #bg-cover{
        &:before{
            z-index:-1;
            background-image:url(https://image.tmdb.org/t/p/original${detailTv?.backdrop_path});
        }
       }
       svg{
        display:inline-block !important
       }
       `,
          }}
        ></style>
      </Head>
      <Layout>
        <div className="container w-full max-w-full pt-5">
          <div
            id="bg-cover"
            className={`flex before:bg-cover before:bg-center before:bg-no-repeat before:w-full w-full before:absolute before:inset-0 before:max-h-[35rem] max-h-[35rem] before:opacity-30 mb-[44px]`}
          >
            {!isLoading ? (
              <>
                <div className={`flex-none w-1/3 max-w-[300px] rounded-lg overflow-hidden	`} data-aos="fade-up">
                  <img className="lazy-load-image" src={imageUrl + detailTv?.poster_path} alt="" />
                </div>
                <div className={`w-2/3 max-h-full rounded-lg overflow-hidden px-8 flex flex-col justify-center`}>
                  <h2 className="text-4xl my-2" data-aos="fade-left">
                    <span className="font-bold">{detailTv?.name}</span>({detailTv?.first_air_date?.slice(0, 4)})
                  </h2>

                  <div className="my-2" data-aos="fade-left">
                    <span>
                      {detailTv?.release_date} ({detailTv?.production_countries[0]?.iso_3166_1})
                    </span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-dot"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                      </svg>
                    </span>
                    <span>
                      {detailTv?.genres?.map((val) => {
                        return val.name + ", ";
                      })}
                    </span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-dot"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                      </svg>
                    </span>
                    <span>{timeConvert(detailTv?.runtime)}</span>
                    <p></p>
                  </div>

                  <div className="flex items-center	my-2" data-aos="fade-left">
                    <span className="relative " style={{ left: 0, height: 56, width: 56 }}>
                      <p className="text-[16px] py-4 px-3 absolute" style={{ left: 2, bottom: 0, zIndex: 1 }}>
                        {detailTv?.vote_average.toString().slice(0, 3) * 10}%
                      </p>
                      <div className="w-full">
                        <svg
                          className="absolute"
                          width="56"
                          height="56"
                          style={{
                            color: bgcolor(detailTv?.vote_average.toString().slice(0, 3) * 10),
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <circle
                            id={`circle ${detailTv?.id}`}
                            // className="progress-ring__circle"
                            stroke={bgcolor(detailTv?.vote_average * 10)}
                            strokeWidth="2"
                            fill="#001D3D"
                            r="24"
                            cx="28"
                            cy="28"
                            width={60}
                            height={60}
                          />
                        </svg>
                      </div>
                    </span>

                    <span className="ml-2 font-bold max-w-[48px]">User Score</span>
                    <span>
                      <IconContainer>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-card-list"
                          viewBox="0 0 16 16"
                        >
                          <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                          <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                        </svg>
                      </IconContainer>
                    </span>
                    <span>
                      <IconContainer>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-heart-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                          />
                        </svg>
                      </IconContainer>
                    </span>
                    <span>
                      <IconContainer>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-bookmark-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
                        </svg>
                      </IconContainer>
                    </span>
                    <span>
                      <IconContainer>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-star-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                      </IconContainer>
                    </span>
                  </div>

                  <div className="my-2" data-aos="fade-left">
                    <p className="italic opacity-80">{detailTv?.tagline}</p>
                  </div>
                  <div className="my-2" data-aos="fade-left">
                    <h4 className="font-bold text-xl">Overview</h4>
                    <p className="my-1">{detailTv?.overview}</p>
                  </div>
                </div>
              </>
            ) : (
              <DetailSkeleton />
            )}
          </div>

          {/* ------------------BELOW SECTION------------------ */}
          <div className="flex mb-[32px]">
            <div className={`w-2/3 `}>
              <h3 className="font-bold text-2xl">Series Cast</h3>
              <div>
                {!isLoading ? (
                  <div className={`relative ${castingScrolled ? "scrolled" : ""}`} id="cast_scroller">
                    <div className={`flex overflow-x-scroll w-full flex-nowrap px-4 py-4 my-6`} onScroll={handleScroll}>
                      {castingList?.cast?.slice(0, 10).map((val,index) => {
                        return (
                          <div className="" data-aos="fade-left" data-aos-delay={`${index}00`}>
                            <CastingList data={val} />
                          </div>
                        );
                      })}
                      <p className="m-auto mx-4 min-w-[128px] font-bold">
                        <Link href={`/cast/tv-${id}`}>
                          view more{" "}
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-arrow-right font-bold"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                              />
                            </svg>
                          </span>
                        </Link>
                      </p>
                    </div>
                    <Link href={`/cast/tv-${id}`}>Full Cast & Crew</Link>
                  </div>
                ) : (
                  <div className="flex overflow-x-scroll w-full flex-nowrap px-4 py-4 my-6">
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                  </div>
                )}
              </div>
              <div className=" border-b-[1px] mt-[32px] mb-[32px]"></div>
              <div>
                {/* ------------------SEASON SECTION------------------ */}
                <h3 className="font-bold text-2xl mb-[16px]">Current Season</h3>
                <div className="flex box-shadow border-[1px] border-[#374151] rounded-[8px] gap-[12px]">
                  <img
                    className="lazy-load-image max-w-[120px] rounded-l-[8px] object-cover	"
                    src={imageUrl + detailTv?.seasons?.slice(-1)[0]?.poster_path}
                    alt=""
                  />
                  <div className="p-[20px]">
                    <h3 className="font-bold text-xl">{detailTv?.seasons?.slice(-1)[0]?.name}</h3>
                    <div className="flex gap-[4px] text-sm items-center font-bold">
                      <StarReview voteAverage={detailTv?.seasons?.slice(-1)[0]?.vote_average} />
                      <span>{detailTv?.seasons?.slice(-1)[0]?.air_date?.split("-")[0]}</span>
                      <span className="flex w-[8px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-circle-fill"
                          viewBox="0 0 16 16"
                        >
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                      </span>
                      <span>{detailTv?.seasons?.slice(-1)[0]?.episode_count + " Episodes"}</span>
                    </div>
                    <p className="text-sm my-[12px]">
                      {detailTv?.seasons?.slice(-1)[0]?.overview ||
                        detailTv?.seasons?.slice(-1)[0].name +
                          " of " +
                          detailTv?.name +
                          " permiered on " +
                          formatDate(detailTv?.seasons?.slice(-1)[0]?.air_date)}
                    </p>
                    <div className="text-sm my-[12px] flex items-center gap-[8px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-calendar3"
                        viewBox="0 0 16 16"
                      >
                        <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
                        <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                      </svg>
                      <span className="text-sm border-b-[1px]">
                        <Link href={""}>
                          {detailTv?.next_episode_to_air?.name || detailTv?.last_episode_to_air?.name}
                        </Link>
                      </span>
                      <span>
                        ({detailTv?.next_episode_to_air?.season_number || detailTv?.last_episode_to_air?.season_number}x
                        {detailTv?.next_episode_to_air?.episode_number || detailTv?.last_episode_to_air?.episode_number}
                        ,
                        {formatDate(detailTv?.next_episode_to_air?.air_date || detailTv?.last_episode_to_air?.air_date)}
                        )
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/3 min-w-[260px] px-3" data-aos="fade-up">
              <div className="h-full">
                {/* SOCIAL MEDIA ICON */}
                <div className="mb-8">
                  <span className="pr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-facebook"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                    </svg>
                  </span>
                  <span className="px-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-twitter"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15" />
                    </svg>
                  </span>
                  <span className="px-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-instagram"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                    </svg>
                  </span>
                </div>
                <div className="w-full mb-4">
                  <h4 className="text-[16px] font-bold">Status</h4>
                  <p className="text-[16px]">{detailTv?.status}</p>
                </div>
                <div className="w-full mb-4">
                  <h4 className="text-[16px] font-bold">Original Language</h4>
                  <p className="text-[16px]">{detailTv?.original_language.toUpperCase()}</p>
                </div>
                <div className="w-full mb-4">
                  <h4 className="text-[16px] font-bold">Network</h4>
                  <p className="text-[16px]">
                    {detailTv?.networks?.map((val) => {
                      return (
                        <img
                          className="lazy-load-image mb-2"
                          src={imageUrl + val?.logo_path}
                          alt=""
                          style={{ height: 32 }}
                        />
                      );
                    })}
                  </p>
                </div>
                <div className="w-full mb-4">
                  <h4 className="text-[16px] font-bold">Type</h4>
                  <p className="text-[16px]">{detailTv?.type}</p>
                </div>
                <div className="w-full">
                  <h4 className="text-[16px] font-bold">Keywords</h4>
                  <div className="text-[16px] flex flex-wrap">
                    {tvKeywords?.results?.map((val) => {
                      return (
                        <span className="mr-2 mb-2 bg-gray-700 p-1 border rounded border-[#59677d]" data-aos="fade-up">
                          {val.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default DetailTvSeries;
