import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "5f371d5e8a786b66793334e826cbf582",
    language: "ko-KR",
  },
});

export const tvApi = {
  popular: () => api.get("tv/popular"),
  airingToday: () => api.get("tv/airing_today"),
  onTheAir: () => api.get("tv/on_the_air"),
  topRated: () => api.get("tv/top_rated"),
  showDetail: (id) =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  tvSearch: (term) =>
    api.get("search/tv", {
      params: {
        query: term,
      },
    }),
};

export const movieApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  popular: () => api.get("movie/popular"),
  topRated: () => api.get("movie/top_rated"),
  upcoming: () => api.get("movie/upcoming"),
  movieDetail: (id) =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  movieSearch: (term) =>
    api.get("search/movie", {
      params: {
        query: term,
      },
    }),
};
