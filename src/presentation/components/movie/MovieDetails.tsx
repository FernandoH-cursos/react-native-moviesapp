import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {FullMovie} from '../../../core/entities/movie.entity';
import {colors} from '../../../config/theme/app-theme';
import {Formatter} from '../../../config/helpers/formatter';
import { Cast } from '../../../core/entities/cast.entity';
import { CastActor } from '../cast/CastActor';

interface Props {
  movie: FullMovie;
  cast: Cast[];
}

export const MovieDetails = ({movie,cast}: Props) => {
  return (
    <>
      <View style={{marginHorizontal: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: colors.text}}>{movie.rating}</Text>
          <Text style={{color: colors.text, marginLeft: 5}}>
            - {movie.genres.join(', ')}
          </Text>
        </View>

        <Text
          style={{
            color: colors.text,
            fontSize: 23,
            marginTop: 10,
            fontWeight: 'bold',
          }}>
          Historia
        </Text>

        <Text style={{color: colors.text, fontSize: 16}}>
          {movie.description}
        </Text>

        <Text
          style={{
            color: colors.text,
            fontSize: 23,
            marginTop: 10,
            fontWeight: 'bold',
          }}>
          Presupuesto
        </Text>

        <Text style={{color: colors.text, fontSize: 18}}>
          {Formatter.currency(movie.budget)}
        </Text>
      </View>

      {/* Casting */}
      <View style={{marginTop: 10, marginBottom: 50}}>
        <Text
          style={{
            color: colors.text,
            fontSize: 23,
            marginVertical: 10,
            marginHorizontal: 20,
            fontWeight: 'bold',
          }}>
          Actores
        </Text>

        <FlatList
          data={cast}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <CastActor actor={item} />}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </View>
    </>
  );
};
