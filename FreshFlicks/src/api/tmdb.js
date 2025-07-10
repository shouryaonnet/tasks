const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchNowPlayingMovies = async (page = 1) => {
  const res = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`
  );
  const data = await res.json();
  return data.results || [];
};

export const fetchAiringTVShows = async (page = 1) => {
  const res = await fetch(
    `${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&page=${page}`
  );
  const data = await res.json();
  return data.results || [];
};
