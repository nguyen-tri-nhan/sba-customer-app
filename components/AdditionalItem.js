import React, { useState } from 'react';
import { useStyle } from '../utils/style';
import { Text, View, Button } from 'react-native';
import { toVND } from '../utils/CurrencyHelper';

function AdditionalItem({ item, onAmountChange }) {

  const [amount, setAmount] = useState(0);

  const styles = useStyle();

  const onAdd = () => {
    setAmount(amount + 1);
  }

  const onSubtract = () => {
    if (amount > 0) {
      setAmount(amount - 1);
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