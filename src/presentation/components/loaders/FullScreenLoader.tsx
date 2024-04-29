import React from 'react'
import { ActivityIndicator, View } from 'react-native'

export const FullScreenLoader = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
      {/* Crea un loader indicando el tamaño y color */}
      <ActivityIndicator size="large" color="indigo" />
    </View>
  );
}
