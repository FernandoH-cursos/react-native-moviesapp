import React from 'react';
import { View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useMovies} from '../../hooks/useMovies';
import {PosterCarousel} from '../../components/movies/PosterCarousel';
import {HorizontalCarousel} from '../../components/movies/HorizontalCarousel';
import { FullScreenLoader } from '../../components/loaders/FullScreenLoader';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {isLoading, nowPlaying, popular, topRated, upcoming,popularNextPage} = useMovies();

  return (
    <>
      {isLoading ? (
        <FullScreenLoader />
      ) : (
        <ScrollView>
          <View style={{marginTop: top + 20, paddingBottom: 30}}>
            {/* Estrenos */}
            <PosterCarousel movies={nowPlaying} />

            <HorizontalCarousel
              movies={popular}
              title="Populares"
              loadNextPage={popularNextPage}
            />

            <HorizontalCarousel movies={topRated} title="Mejor calificadas" />

            <HorizontalCarousel movies={upcoming} title="Proximamente" />
          </View>
        </ScrollView>
      )}
    </>
  );
};
