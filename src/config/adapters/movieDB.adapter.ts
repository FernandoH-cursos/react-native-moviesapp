import { AxiosAdapter } from './http/axios.adapter';
import { THE_MOVIE_DB_KEY } from '@env';

export const movieDBFetcher = new AxiosAdapter({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: THE_MOVIE_DB_KEY ?? 'no-key',
    language: 'es',
  },
});
