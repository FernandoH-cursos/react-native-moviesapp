import React from 'react';
import {View} from 'react-native';
import {Movie} from '../../../core/entities/movie.entity';
import {ScrollView} from 'react-native-gesture-handler';
import {MoviePoster} from './MoviePoster';

interface Props {
  movies: Movie[];
  height?: number;
}
//? Componente <ScrollView>:
//* 'showsHorizontalScrollIndicator={false}' es para que no se muestre la barra de scroll horizontal.
//* 'horizontal' es para que el scroll sea horizontal.
export const PosterCarousel = ({height = 440, movies}: Props) => {
  return (
    <View style={{height}}>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        {movies.map(movie => (
          <MoviePoster key={movie.id} movie={movie} />
        ))}
      </ScrollView>
    </View>
  );
};
