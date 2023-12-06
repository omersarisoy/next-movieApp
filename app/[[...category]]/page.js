import React from "react"
import HomeContainer from "@/containers/home"
import Movies from '@/mocks/movies.json'


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `${process.env.API_KEY}`
  }
};

// console.log('process.env.API_KEY :>> ', process.env.API_KEY);

const API_URL = 'https://api.themoviedb.org/3'

const getTopRatedMovies = async () => {
  return await fetch(`${API_URL}/movie/top_rated?language=en-US&page=1`,options)
  .then(response => response.json())
}
const getPopularMovies = async () => {
  return await fetch(`${API_URL}/movie/popular?language=en-US&page=1`,options)
  .then(response => response.json())
}

async function Home({ params }) {
  let selectedCategory;

  const topRatedPromise = getTopRatedMovies()
  const popularPromise = getPopularMovies()

  const [{results: topRatedMovies}, { results: popularMovies }] = 
  await Promise.all([topRatedPromise, popularPromise])
  
  if(params.category?.length > 0) {
    selectedCategory = true;
  }
  // console.log('popularMovies :>> ', popularMovies);
  return (
    <HomeContainer 
      topRatedMovies={topRatedMovies}
      popularMovies={popularMovies}
      selectedCategory={{
        id: params.category?.[0] ?? '',
        movies: selectedCategory ? Movies.results.slice(0,7) : []
      }}
    />
  )
}
export default Home;