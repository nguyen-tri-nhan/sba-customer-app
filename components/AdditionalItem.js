import React, { useState } from 'react';
import { useStyle } from '../utils/style';
import { Text, View, Button } from 'react-native';
import { toVND } from '../utils/CurrencyHelper';

function AdditionalItem({ item, onAmountChange }) {

  const [amount, setAmount] = useState(0);

  const styles = useStyle();

  const onAdd = () => {
    const value = amount + 1;
    setAmount(value);
    if (onAmountChange) {
      onAmountChange(item, value);
    }
  }

  const onSubtract = () => {
    if (amount > 0) {
      const value = amount - 1;
      setAmount(value);
      if (onAmountChange) {
        onAmountChange(item, value);
      }
    }
  }

  return (
    <View style={styles.additionalItemContainer}>
      <Text>{item.itemName}</Text>
      <View style={styles.additionalItemAmount}>
        <Text>{toVND(item.price)}</Text>
        <Button title='-' onPress={onSubtract} />
        <Text>{amount}</Text>
        <Button title='+' onPress={onAdd} />
      </View>
    </View>
  );
}

export default AdditionalItem;