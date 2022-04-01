import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useStyle } from '../utils/style';

function Showroom({ showroom, onSelectedShowroom }) {

  const styles = useStyle();

  const handlePress = () => {
    if (onSelectedShowroom) {
      onSelectedShowroom(showroom);
    }
  }

  console.log(showroom);
  return (
    <TouchableOpacity style={styles.packageContainer} onPress={handlePress}>
      <View style={[styles.packageInfomation, styles.mt_40]}>
        <Text>{showroom.name}</Text>
        <Text>{showroom.address}</Text>
        <Text>{showroom.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default Showroom;