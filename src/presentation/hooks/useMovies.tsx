import {useEffect, useState} from 'react';
import {Movie} from '../../core/entities/movie.entity';

import * as UseCases from '../../core/use-cases/';
import { movieDBFetcher } from '../../config/adapters/movieDB.adapter';

let popularPageNumber = 1;

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);

  useEffect(() => {
    initialLoad();
  },[]);

  const initialLoad = async () => {
    //* Invocando todos los casos de uso de movies(peliculas)
    const nowPlayingMoviesPromise =
      UseCases.moviesNowPlayingUseCase(movieDBFetcher);
    const upcomingMoviesPromise =
      UseCases.moviesUpcomingUseCase(movieDBFetcher);
    const topRatedMoviesPromise =
      UseCases.moviesTopRatedUseCase(movieDBFetcher);
    const popularMoviesPromise = UseCases.moviesPopularUseCase(movieDBFetcher);

    const [nowPlayingMovies, upcomingMovies, topRatedMovies, popularMovies] =
      await Promise.all([
        nowPlayingMoviesPromise,
        upcomingMoviesPromise,
        topRatedMoviesPromise,
        popularMoviesPromise,
      ]);

    setNowPlaying(nowPlayingMovies);
    setUpcoming(upcomingMovies);
    setTopRated(topRatedMovies);
    setPopular(popularMovies);

    setIsLoading(false);
  };

  const popularNextPage = async () => {
    popularPageNumber++;

    const popularMovies = await UseCases.moviesPopularUseCase(movieDBFetcher, { page: popularPageNumber });
    setPopular((prev) => [...prev, ...popularMovies]);
  };

  return {
    isLoading,
    nowPlaying,
    upcoming,
    topRated,
    popular,

    // Methods
    popularNextPage,
  };
};
