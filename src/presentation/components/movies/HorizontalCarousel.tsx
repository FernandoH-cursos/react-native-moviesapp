import React, { useEffect, useRef } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, Text, View } from 'react-native';

import { MoviePoster } from './MoviePoster';
import { Movie } from '../../../core/entities/movie.entity';

import {colors} from '../../../config/theme/app-theme';

interface Props {
  movies: Movie[];
  title?: string;
  loadNextPage?: () => void;
}
//? Componente <FlatList>:
//* 'data' es el arreglo de items que se va a renderizar.
//* 'renderItem' es una función que recibe un objeto con la propiedad 'item' que es el item que se va a renderizar.
//* 'keyExtractor' es una función que recibe un item y retorna un string que será el id del item.
//* 'showsHorizontalScrollIndicator={false}' es para que no se muestre la barra de scroll horizontal.
//* 'onScroll' es una función que recibe un evento de scroll que se puede usar para hacer algo cuando se haga scroll.
//* 'horizontal' es para que el scroll sea horizontal.
export const HorizontalCarousel = ({ movies, title, loadNextPage }: Props) => {
  //* Variable que indica si se está cargando la siguiente página de películas.
  const isLoading = useRef(false);

  //* Se ejecuta cuando se actualiza la lista de películas.
  useEffect(() => {
    //* Se establece un tiempo de 200ms para que isLoading sea false y se pueda cargar la siguiente página.
    setTimeout(() => {
      isLoading.current = false;
    }, 200);
  }, [movies]);

  //* Función que se ejecuta cuando se hace scroll en el componente <FlatList>.
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isLoading.current) return;

    //* - 'contentOffset' es la posición actual del scroll(ya sea horizontal o vertical. x o y).
    //* - 'layoutMeasurement' es el tamaño del scroll que contiene tanto el width como el height del scroll.
    //* - 'contentSize' es el tamaño total del contenido que se puede scrolear que contiene tanto
    //*   el width como el height del contenido.
    const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;

    //* Se calcula si el scroll llegó al final del contenido.
    const isEndReached =
      contentOffset.x + layoutMeasurement.width + 600 >= contentSize.width;

    if (!isEndReached) return;

    isLoading.current = true;

    //TODO: Cargar las siguientes películas.
    loadNextPage && loadNextPage();
  };

  return (
    <View style={{height: title ? 260 : 220}}>
      {title && (
        <Text
          style={{
            fontSize: 30,
            fontWeight: 300,
            marginLeft: 10,
            marginBottom: 10,
            color: colors.text,
          }}>
          {title}
        </Text>
      )}

      <FlatList
        data={movies}
        renderItem={({item}) => (
          <MoviePoster movie={item} width={140} height={200} />
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        horizontal
      />
    </View>
  );
};
