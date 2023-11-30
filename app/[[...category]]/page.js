import React from "react"
import HomeContainer from "@/containers/home"
import Movies from '@/mocks/movies.json'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWFlYjJmN2MwYjQxNTVjYjc0NThlODBlMTMxNzU3NiIsInN1YiI6IjY1NjcxMTIxYTM0OTExMDEzOGU2YTM0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a4s-qtyrQrY1i2cv1C8H8Ehcjd9oHjaOqbdkv7QYhOY`
  }
};
const API_URL = 'https://api.themoviedb.org/3'
const getTopRatedMovies = async () => {
  const res = await fetch(`${API_URL}/movie/top_rated?language=en-US&page=1`,options)
  return res.json();
}

async function Home({ params }) {
  let selectedCategory;
  const topRatedMovies = await getTopRatedMovies()
  
  if(params.category?.length > 0) {
    selectedCategory = true;
  }
  console.log('topRatedMovies :>> ', topRatedMovies);
  return (
    <HomeContainer 
      // popularMovies={popularMovies}
      selectedCategory={{
        id: params.category?.[0] ?? '',
        movies: selectedCategory ? Movies.results.slice(0,7) : []
      }}
    />
  )
}
export default Home;