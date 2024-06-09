import React, { useEffect, useState } from "react";
import { getTrendingMovies, getTrendingSeries } from "../../../services/Getdata";

import Switcher from "../../reusable/Switcher";
import CardSkeleton from "../../skeleton/CardSkeleton";
import Card from "../../Card";

const Trending = () => {
  const [dataTrending, setDataTrending] = useState([]);
  const [dataMovie, setDataMovie] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [switcher, setSwitcher] = useState(false);

  useEffect(() => {
    getAllData(switcher);
  }, [switcher]);

  const getAllData = async (type) => {
    setIsloading(true);
    if (!type) {
      await getTrendingMovies().then((value) => {
        setDataTrending(value);
      });
    } else {
      await getTrendingSeries().then((value) => {
        setDataMovie(value);
      });
    }
    setTimeout(() => {
      setIsloading(false);
    }, 500);
  };

  return (
    <section>
      <div className="px-10 py-10">
        <div className="flex items-center gap-[8px]">
          <h3>Trending</h3>
          <Switcher switchState={switcher} setSwitchState={setSwitcher} labelLeft={"Movies"} labelRight={"Series"} />
        </div>
        {!isLoading ? (
          <>
            <div
              className={`flex overflow-x-scroll w-full flex-nowrap px-4 py-4 fade-in ${!switcher ? "" : "hidden"}`}
              data-aos="fade-left"
            >
              {dataTrending.map((value, index) => {
                return (
                  <div data-aos="fade-left" data-aos-delay={`${index}00`} key={index}>
                    <Card data={value} type="movie" key={index} />
                  </div>
                );
              })}
            </div>
            <div
              className={`flex overflow-x-scroll w-full flex-nowrap px-4 py-4 fade-in ${switcher ? "" : "hidden"}`}
              data-aos="fade-left"
            >
              {dataMovie.map((value, index) => {
                return (
                  <div data-aos="fade-left" data-aos-delay={`${index}00`} key={index}>
                    <Card data={value} type="tv-series" key={index} />
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="flex overflow-x-scroll w-full flex-nowrap px-4 py-4">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        )}
      </div>
    </section>
  );
};

export default Trending;
