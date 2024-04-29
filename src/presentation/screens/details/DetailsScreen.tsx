import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';

import {useMovie} from '../../hooks/useMovie';
import {MovieHeader} from '../../components/movie/MovieHeader';
import {MovieDetails} from '../../components/movie/MovieDetails';
import {FullScreenLoader} from '../../components/loaders/FullScreenLoader';
import {RootStackParam} from '../../navigation/Navigation';

// Tipado de data(parametros) de un screen en Stack Navigator
interface Props extends StackScreenProps<RootStackParam, 'Details'> {}

export const DetailsScreen = ({route}: Props) => {
  const {movieId} = route.params;

  const {isLoading, movie, cast} = useMovie(movieId);


  return (
    <>
      {isLoading ? (
        <FullScreenLoader />
      ) : (
        <ScrollView>
          {/* Header */}
          <MovieHeader
            title={movie!.title}
            originalTitle={movie!.originalTitle}
            poster={movie!.poster}
          />

          {/* Details */}
          <MovieDetails movie={movie!} cast={cast!} />
        </ScrollView>
      )}
    </>
  );
};
