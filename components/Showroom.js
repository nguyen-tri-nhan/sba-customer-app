import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

function Showroom({ showroom, onSelectedShowroom }) {

  const handlePress = () => {
    if (onSelectedShowroom) {
      onSelectedShowroom(showroom);
    }
  }

  console.log(showroom);
  return (
    <TouchableOpacity onPress={handlePress}>
      <View>
        <Text>{showroom.name}</Text>
        <Text>{showroom.address}</Text>
        <Text>{showroom.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default Showroom;