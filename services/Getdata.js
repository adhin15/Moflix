import { bearerToken } from "./Apikey";

const url = `https://api.themoviedb.org/3`;

//////------MOVIES------//////

export const getTrendingMovies = async (time_window = "day") => {
  try {
    const response = await fetch(`${url}/trending/movie/${time_window}`, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
        accept: "application/json",
      },
    });
    const responseData = await response.json();
    console.log("log trending", responseData);
    return Promise.resolve(responseData.results);
  } catch {}
};

export const getDetailMovie = async (id) => {
  const fullUrl = `${url}/movie/${id}`;
  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
        accept: "application/json",
      },
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
  }
};

export const getMovieCastingList = async (id) => {
  const fullUrl = `${url}/movie/${id}/credits`;
  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
        accept: "application/json",
      },
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
  }
};

export const getMovieKeywords = async (id) => {
  const fullUrl = `${url}/movie/${id}/keywords`;
  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
        accept: "application/json",
      },
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
  }
};

export const getUpcomingMovies = async () =>{
  const fullUrl = `${url}/movie/upcoming`;
  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
        accept: "application/json",
      },
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
  }
}

export const getMoviesVideo = async (id) =>{
  const fullUrl = `${url}/movie/${id}/videos`;
  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
        accept: "application/json",
      },
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
  }
}

export const searchMovie = async (params) =>{
  const {keyword,adult="false",page=1,} = params
  const fullUrl = `${url}/search/movie?query=${keyword}&include_adult=${adult}&language=en-US&page=${page}`;
  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
        accept: "application/json",
      },
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
  }
}

export const getExternalIds = async (movie_id) =>{
  const fullUrl = `${url}/movie/${movie_id}/external_ids`;
  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
        accept: "application/json",
      },
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
  }
}

//////------SERIES------//////


export const getTrendingSeries = async (time_window = "day") => {
  try {
    const response = await fetch(`${url}/trending/tv/${time_window}`, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
        accept: "application/json",
      },
    });
    const responseData = await response.json();
    console.log("log trending", responseData);
    return Promise.resolve(responseData.results);
  } catch {}
};

export const getDetailTv = async (id) => {
  const fullUrl = `${url}/tv/${id}`;
  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
        accept: "application/json",
      },
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
  }
};

export const getTvCastingList = async (id) => {
  const fullUrl = `${url}/tv/${id}/credits`;
  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
        accept: "application/json",
      },
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
  }
};

export const getTvKeywords = async (id) => {
  const fullUrl = `${url}/tv/${id}/keywords`;
  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
        accept: "application/json",
      },
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
  }
};

export const getAiringToday = async () =>{
  const fullUrl = `${url}/tv/airing_today`;
  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
        accept: "application/json",
      },
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
  }
}

export const getTvVideo = async (id) =>{
  const fullUrl = `${url}/tv/${id}/videos`;
  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
        accept: "application/json",
      },
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
  }
}
export const searchTv = async (params) =>{
  const {keyword,adult="false",page=1,} = params
  const fullUrl = `${url}/search/tv?query=${keyword}&include_adult=${adult}&language=en-US&page=${page}`;
  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
        accept: "application/json",
      },
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
  }
}



//////------PERSON------//////

export const getDetailPerson = async (id) => {
  const fullUrl = `${url}/person/${id}`;
  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
        accept: "application/json",
      },
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
  }
};

export const getPersonCredit = async (id) => {
  const fullUrl = `${url}/person/${id}/combined_credits`;
  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
        accept: "application/json",
      },
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
  }
};




export const searchMulti = async (params) =>{
  const {keyword,adult="false",page=1,} = params
  const fullUrl = `${url}/search/multi?query=${keyword}&include_adult=${adult}&language=en-US&page=${page}`;
  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
        accept: "application/json",
      },
    });
    const responseData = await response.json();
    return Promise.resolve(responseData);
  } catch (err) {
    console.log(err);
  }
}

export const getImage = async (url) => {
  const fullUrl = `https://image.tmdb.org/t/p/original/${url}`;
  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      mode: "no-cors",
    });
    const responseData = await response.json();
    console.log("log image b64", responseData);
    return Promise.resolve(responseData.results);
  } catch (err) {
    console.log("err image", err);
  }
};

