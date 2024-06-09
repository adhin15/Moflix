import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { searchMulti, searchMovie, searchTv } from "../../services/Getdata";
import { useEffect, useState } from "react";
import SearchResult from "../../components/SearchResult";
import Pagination from "../../components/reusable/Pagination";
import SearchSkeleton from "../../components/skeleton/SearchSkeleton";

const SearchPage = () => {
  const router = useRouter();
  const { query, movie, tv } = router?.query;
  const keyword = query || movie || tv;
  const [searchResult, setSearchResult] = useState([]);
  const [allMetaData, setAllMetaData] = useState({});
  const [active, setActive] = useState("none");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    if (query || movie || tv) {
      if (query) {
        getAllData().then((val) => {
          if (val === "movie") {
            console.log("lewat movie");
            getData({
              type: "movie",
              query: keyword,
              page: page,
              adult: false,
            }).then((res) => {
              setSearchResult(res);
              setTotalPage(res.total_pages);
              if (active == "none") {
                setActive("movie");
              }
            });
          } else if (val === "tv") {
            console.log("lewat tv");
            getData({
              type: "tv",
              query: keyword,
              page: page,
              adult: false,
            }).then((res) => {
              setSearchResult(res);
              setTotalPage(res.total_pages);
              if (active == "none") {
                setActive("tv");
              }
            });
          }
        });
      } else if (movie) {
        setActive("movie");
        getData({
          type: "movie",
          query: keyword,
          page: page,
          adult: false,
        }).then((res) => {
          setSearchResult(res);
        });
      } else if (tv) {
        setActive("tv");
        getData({
          type: "tv",
          query: keyword,
          page: page,
          adult: false,
        }).then((res) => {
          setSearchResult(res);
        });
      }
    }
  }, [query, movie, tv]);

  useEffect(() => {
    getAllData().then((val) => {
      console.log("log all", val);
    });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: -10, behavior: "smooth" });
    if (active !== "none") {
      getData({
        type: active,
        query: keyword,
        currentPage: page,
        adult: false,
      }).then((res) => {
        setTotalPage(res.total_pages);
        console.log("masuk gini");
        setSearchResult(res);
      });
    }
  }, [active, page]);

  const getData = async (params) => {
    const { type, query, currentPage, adult = false } = params;
    setIsloading(true);
    try {
      if (type === "movie") {
        const result = await searchMovie({
          keyword: query,
          page: currentPage,
          adult: adult,
        });
        return Promise.resolve(result);
      } else if (type === "tv") {
        const result = await searchTv({
          keyword: query,
          page: currentPage,
          adult: adult,
        });
        return Promise.resolve(result);
      } else {
        const result = await searchMulti({
          keyword: query,
          page: currentPage,
          adult: adult,
        });
        return Promise.resolve(result);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsloading(false);
    }
  };

  const getAllData = async () => {
    return new Promise((resolve, reject) => {
      getData({
        type: "movie",
        query: keyword,
        page: page,
        adult: false,
      }).then((resMovie) => {
        getData({
          type: "tv",
          query: keyword,
          page: page,
          adult: false,
        }).then((resTv) => {
          setAllMetaData({
            movie: resMovie,
            tv: resTv,
          });
          if (resMovie?.total_pages > resTv?.total_pages) {
            resolve("movie");
          } else {
            resolve("tv");
          }
        });
      });
    });
  };

  useEffect(() => {
    console.log("log data", allMetaData);
  }, [allMetaData]);

  return (
    <Layout>
      <div className="flex py-12">
        <div className="w-1/3 pr-4">
          <div className="bg-fff border rounded border-[#59677d] min-h-[120px] overflow-hidden">
            <div className="bg-[#5c4702] p-4">
              <h4 className="font-bold text-black">Search Result</h4>
            </div>
            <div>
              <div
                className={`flex justify-between py-2 px-4 hover:opacity-75 cursor-pointer ${
                  active == "movie" ? "bg-[#012459]" : ""
                }`}
                onClick={() => {
                  setActive("movie");
                }}
              >
                <span>Movies</span>
                <span>{allMetaData?.movie?.total_results}</span>
              </div>
              <div
                className={`flex justify-between py-2 px-4 hover:opacity-75 cursor-pointer ${
                  active == "tv" ? "bg-[#012459]" : ""
                }`}
                onClick={() => {
                  setActive("tv");
                }}
              >
                <span>Tv Shows</span>
                <span>{allMetaData?.tv?.total_results}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/3 pl-4">
          <div>
            {!isLoading
              ? searchResult?.results?.map((val, index) => {
                  return (
                    <div data-aos="fade-up" data-aos-delay={100}>
                      <SearchResult data={val} type={active} />
                    </div>
                  );
                })
              : <>
              <SearchSkeleton/>
              <SearchSkeleton/>
              <SearchSkeleton/>
              <SearchSkeleton/>
              <SearchSkeleton/>
              </>}
            <div>
              <Pagination totalPages={totalPage} currentPage={page} setPage={setPage} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const sideBox = (params) => {
  const { data, priority } = params;

  switch (priority) {
    case "movies":
      return (
        <div>
          <div className="flex justify-between">
            <span>Movies</span>
            <span>{data?.movie?.total_results}</span>
          </div>
          <div className="flex justify-between">
            <span>Tv Shows</span>
            <span>{data?.tv?.total_results}</span>
          </div>
        </div>
      );
    case "tv":
      return (
        <div>
          <div className="flex justify-between">
            <span>Movies</span>
            <span>{data?.movie?.total_results}</span>
          </div>
          <div className="flex justify-between">
            <span>Movies</span>
            <span>{data?.tv?.total_results}</span>
          </div>
        </div>
      );
    default:
      return;
  }
};

export default SearchPage;
