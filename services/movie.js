const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `${process.env.API_KEY}`
  }
};

const API_URL = 'https://api.themoviedb.org/3'

const fetchMovies = async (pathname, query = '') => {
  try {
    const res = await fetch(`${API_URL}${pathname}${query}`,options)
    return res.json();
  } catch (error) {
    throw new Error(error);
  }
}

const getTopRatedMovies = async () => {
  return fetchMovies('/movie/top_rated')
}
const getPopularMovies = async () => {
  return fetchMovies('/movie/popular')
}
const getCategories = async () => {
  return fetchMovies('/genre/movie/list')
}

const getSingleCategory = async (genreId) => {
  return fetchMovies('/discover/movie', `?with_genres=${genreId}`)
}

const getMovie = async (movieId) => {
  return fetchMovies(`/movie/${movieId}`)
}

export {
  fetchMovies, 
  getTopRatedMovies, 
  getPopularMovies, 
  getCategories, 
  getSingleCategory,
  getMovie
}