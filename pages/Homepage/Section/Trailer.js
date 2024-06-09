import React, { useEffect, useState } from "react";
import TrailerCardSkeleton from "../../../components/skeleton/TrailerCardSkeleton";
import TrailerCard from "../../../components/TrailerCards";
import CustomTabs from "../../../components/reusable/CustomTabs";

import { getUpcomingMovies, getMoviesVideo, getAiringToday, getTvVideo } from "../../../services/Getdata";
import Head from "next/head";

const Trailer = () => {
  const [isLoading, setIsloading] = useState(true);
  const [dataUpcoming, setDataUpcoming] = useState([]);
  const [bgSection, setBgSection] = useState("");
  const [youtubeId, setYoutubeId] = useState(0);
  const [modalPlayer, setModalPlayer] = useState(false);
  const [switcher, setSwitcher] = useState(false);
  const [tabs, setTabs] = useState("0");

  useEffect(() => {
    getAllData(tabs);
  }, [tabs]);

  const getAllData = async (type) => {
    setIsloading(true);
    if (type === "0") {
      await getUpcomingMovies().then((res) => {
        setDataUpcoming(res);
        setBgSection(res.results[0].backdrop_path);
      });
      setTimeout(() => {
        setIsloading(false);
      }, 1000);
    } else if (type === "1") {
      await getAiringToday().then((res) => {
        setDataUpcoming(res);
        setBgSection(res.results[0].backdrop_path);
      });
      setTimeout(() => {
        setIsloading(false);
      }, 1000);
    }
  };

  const changeBg = (val) => {
    setBgSection(val);
  };

  const getTrailer = (val) => {
    if (tabs === "0") {
      setYoutubeId(0);
      setModalPlayer(true);
      getMoviesVideo(val).then((res) => {
        const result = res.results.filter(function (res) {
          return res.type === "Trailer";
        });
        setYoutubeId(result[0].key);
      });
    } else {
      setYoutubeId(0);
      setModalPlayer(true);
      getTvVideo(val).then((res) => {
        const result = res.results.filter(function (res) {
          return res.type === "Trailer" || res.type === "Teaser";
        });
        setYoutubeId(result[0]?.key || "");
      });
    }
  };

  const closeModal = () => {
    setModalPlayer(false);
    setTimeout(() => {
      setYoutubeId("");
    }, 500);
  };

  useEffect(() => {
    console.log("log tabs", tabs);
  }, [tabs]);

  return (
    <div className="relative my-[32px]">
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
       #backdrop-trailer{
        &:after{
            z-index:-1;
            background-image:url(https://image.tmdb.org/t/p/original${bgSection});
        }
       }
       svg{
        display:inline-block !important
       }
       `,
          }}
        ></style>
      </Head>
      <section
        id="backdrop-trailer"
        className={`bg-cover after:bg-center after:bg-no-repeat after:w-full after:inset-0 after:absolute after:top-0 after:max-h-[25rem] after:z-10 after:opacity-30 min-h-[40%] 
        after:background-image:url(https://image.tmdb.org/t/p/original${bgSection}) transition-image`}
      >
        <div className="px-10 py-10">
          <div className="flex items-center gap-[16px]">
            <h3 className="font-bold text-xl">Trailers</h3>
            <CustomTabs
              Tabs={[
                { label: "Upcoming Movies", value: "0" },
                { label: "Airing Today", value: "1" },
              ]}
              onChange={(e) => {
                setTabs(e);
              }}
            />
          </div>
          {!isLoading ? (
            <>
              <div className={`flex overflow-x-scroll w-full flex-nowrap px-4 py-4 fade-in`} data-aos="fade-left">
                {dataUpcoming?.results?.map((value, index) => {
                  return (
                    <div data-aos="fade-left" data-aos-delay={`${index}00`} key={index}>
                      <TrailerCard
                        onMouseOver={() => {
                          changeBg(value.backdrop_path);
                        }}
                        data={value}
                        type="movie"
                        key={index}
                        playTrailer={() => {
                          getTrailer(value?.id);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className={`flex overflow-x-scroll w-full flex-nowrap px-4 py-4 fade-in`}>
              <TrailerCardSkeleton />
              <TrailerCardSkeleton />
              <TrailerCardSkeleton />
              <TrailerCardSkeleton />
              <TrailerCardSkeleton />
            </div>
          )}
        </div>
      </section>
      <div
        className={`fixed w-full h-full top-0 flex justify-center items-center transition-ease-in ${
          !modalPlayer ? "h-0 opacity-0	" : "opacity-1"
        }`}
        onClick={closeModal}
      >
        <div className="max-w-[1024px] w-full h-full max-h-[640px] bg-[#000]">
          <div
            className="w-full flex justify-end px-2"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <div className="h-[32px] w-[32px]" style={{ cursor: "pointer" }} onClick={closeModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                class="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            </div>
          </div>
          {youtubeId ? (
            <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${youtubeId}`}></iframe>
          ) : youtubeId === 0 ? (
            ""
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <h2 className="font-bold text-center text-xl">Unavailable</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trailer;

// {dataTrending.map((value, index) => {
//   return <Card data={value} type="movie" key={index} />;
// })}
// </div>
// <div className={`flex overflow-x-scroll w-full flex-nowrap px-4 py-4 fade-in ${switcher ? "" : "hidden"}`}>
// {dataMovie.map((value, index) => {
//   return <Card data={value} type="tv-series" key={index} />;
// })}
