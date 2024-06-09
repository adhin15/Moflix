import Link from "next/link";
import { useRouter } from "next/router";
import { getMovieCastingList, getTvCastingList, getDetailMovie, getDetailTv } from "../../services/Getdata";
import react, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import CastSkeleton from "../../components/skeleton/CastSkeleton";
import CastHeaderSkeleton from "../../components/skeleton/CastHeaderSkeleton";

const index = () => {
  const router = useRouter();
  const { id } = router?.query;
  const imageUrl = `https://image.tmdb.org/t/p/original`;

  const [castingList, setCastingList] = useState(null);
  const [detailMovie, setDetailMovie] = useState(null);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    setIsloading(true);
    if (id) {
      const type = id?.split("-")?.[0];
      const query = id?.split("-")?.[1];
      if (type === "movies") {
        getMovieCastingList(query).then((resCasting) => {
          setCastingList(resCasting);
          getDetailMovie(query).then((resDetail) => {
            setDetailMovie(resDetail);
            setIsloading(false);
          });
        });
      } else {
        getTvCastingList(query).then((resCasting) => {
          setCastingList(resCasting);
          getDetailTv(query).then((resDetail) => {
            setDetailMovie(resDetail);
            setIsloading(false);
          });
        });
      }
    }
  }, [id]);
  useEffect(() => {
    window.AOS.init({
      // Initialization
      duration: 1000,
    });
    console.log("log id", id);
  }, [id]);
  const generateImageUrl = (url) => {
    console.log("log url", url);
    if (!url) return "/user.png";

    let fullUrl = imageUrl + url;
    fullUrl = fullUrl.replaceAll(" ", "%20");

    return fullUrl;
  };
  return (
    <Layout>
      <div className="bg-secondary-bg flex flex-wrap p-5 px-12 gap-[16px]" style={{ margin: "0rem -3rem" }}>
        {!isLoading ? (
          <>
            <img
              src={generateImageUrl(detailMovie?.poster_path)}
              className="w-[58px] h-[87px] object-cover lazy-load-image rounded"
              data-aos="fade-right"
            />
            <div className="flex flex-col text-left">
              <h3 className="text-2xl font-bold" data-aos="fade-right">
                {detailMovie?.name || detailMovie?.title} (
                {detailMovie?.release_date?.slice(0, 4) || detailMovie?.first_air_date?.slice(0, 4)})
              </h3>
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
        ) : (
          <CastHeaderSkeleton />
        )}
      </div>
      <div className="container w-full max-w-full pt-5">
        <div className="flex mt-5">
          <div className="w-1/2 flex flex-wrap flex-col">
            <h3 className="text-[24px] font-bold mb-6">
              Cast <span className="font-normal opacity-70">{castingList?.cast?.length}</span>{" "}
            </h3>
            {!isLoading ? (
              castingList?.cast?.map((val, index) => {
                return (
                  <div className="flex w-full mb-8" key={index} data-aos="fade-right">
                    <img
                      src={generateImageUrl(imageUrl + val?.profile_path)}
                      className="w-[66px] h-[66px] object-cover rounded lazy-load-image"
                      alt=""
                      onerror={() => {
                        this.onerror = null;
                        this.src = "user.png";
                      }}
                    />
                    <div className="flex flex-wrap pl-10">
                      <p className="w-full font-bold">{val?.character}</p>
                      <p className="w-full">{val?.name}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                <CastSkeleton />
                <CastSkeleton />
                <CastSkeleton />
                <CastSkeleton />
              </>
            )}
          </div>
          <div className="w-1/2 flex flex-wrap flex-col	">
            <h3 className="text-[24px] font-bold mb-6">
              Crew <span className="font-normal opacity-70">{castingList?.crew?.length}</span>{" "}
            </h3>
            {!isLoading ? (
              castingList?.crew?.map((val, index) => {
                return (
                  <div className="flex w-full mb-8" key={index} data-aos="fade-left">
                    <img
                      src={generateImageUrl(val?.profile_path)}
                      className="w-[66px] h-[66px] object-cover rounded lazy-load-image"
                      alt=""
                      onerror={() => {
                        this.onerror = null;
                        this.src = "user.png";
                      }}
                    />
                    <div className="flex flex-wrap pl-10">
                      <p className="w-full font-bold">{val?.name}</p>
                      <p className="w-full">{val?.department}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                <CastSkeleton />
                <CastSkeleton />
                <CastSkeleton />
                <CastSkeleton />
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default index;
