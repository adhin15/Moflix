import Head from "next/head";
import Layout from "../../components/Layout";
import { getTrendingMovies } from "../../services/Getdata";
import { useEffect, useState } from "react";
import Trending from "./Section/Trending";
import Trailer from "./Section/Trailer";

const Homepage = () => {
  const [bgsection, setBgSection] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getAllData();
    window.AOS.init({
      // Initialization
      duration: 500,
    });
  }, []);

  const getAllData = async () => {
    await getTrendingMovies().then((value) => {
      setBgSection(value[0]?.backdrop_path);
    });
  };

  const submitSearch = (e) => {
    e.preventDefault();
    window.location.replace(`/search?query=${e.target[0].value}`);
  };

  return (
    <>
      <Layout>
        <Head>
          <style
            dangerouslySetInnerHTML={{
              __html: `
       #backdrop-home{
        &:after{
            z-index:-1;
            background-image:url(https://image.tmdb.org/t/p/original${bgsection});
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
          id="backdrop-home"
          className={`bg-cover after:bg-center 
            after:bg-no-repeat after:w-full after:inset-0 after:absolute after:max-h-[25rem] after:-z-10 after:opacity-30
          min-h-[40%]
          `}
        >
          <div className={`container h-96 pt-12 w-full max-w-full px-10`}>
            <div className="block w-full font-bold">
              <h2 className="text-5xl mb-3">Wellcome.</h2>
              <h3 className="text-3xl mb-12">Millions of movies, TV shows and people to discover. Explore now.</h3>
              <form
                onSubmit={submitSearch}
              >
                <div className="flex">
                  <input
                    type="text"
                    name="searchinput"
                    className="w-11/12 text-[#000000] p-3 rounded-l-full focus:outline-0 px-5"
                    placeholder="Search for a movie, tv show, person...."
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                    }}
                  />
                  <button
                    type="submit"
                    className="w-36 bg-main-accent rounded-full -ml-6 text-black active:scale-100 hover:scale-110 transition ease-in-out delay-50"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
        <Trending />
        <div style={{ margin: "0px -48px" }}>
          <Trailer />
        </div>
      </Layout>
    </>
  );
};

export default Homepage;
