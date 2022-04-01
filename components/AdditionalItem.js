import React from 'react';
import { useStyle } from '../utils/style';
import { Text, View, Button } from 'react-native';

function AdditionalItem({ item }) {

  const styles = useStyle();

  return (
    <View style={styles.additionalItemContainer}>
      <Text>{item.itemName}</Text>
      <View style={styles.additionalItemAmount}>
        <Button title='-' />
        <Text>0</Text>
        <Button title='+' />
      </View>
    </View>
  );
}

export default AdditionalItem;