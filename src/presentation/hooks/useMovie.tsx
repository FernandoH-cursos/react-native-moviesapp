import { useCallback, useEffect, useState } from 'react';

import * as UsesCases from '../../core/use-cases';
import { movieDBFetcher } from '../../config/adapters/movieDB.adapter';
import { FullMovie } from '../../core/entities/movie.entity';
import { Cast } from '../../core/entities/cast.entity';

export const useMovie = (movieId: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState<FullMovie>();
  const [cast, setActors] = useState<Cast[]>();

  const loadMovie = useCallback(async () => {
    setIsLoading(true);

    const fullMoviePromise = UsesCases.getMovieByIdUseCase(movieDBFetcher, movieId);
    const castPromise = UsesCases.getMovieCastUseCase(movieDBFetcher, movieId);

    const [fullMovie,actors] = await Promise.all([fullMoviePromise, castPromise]);

    setMovie(fullMovie);
    setActors(actors);

    setIsLoading(false);
  },[movieId]);

  useEffect(() => {
    loadMovie();
  }, [movieId, loadMovie]);



  return {
    isLoading,
    movie,
    cast,
  };
}
