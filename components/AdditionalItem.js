import React, { useState,useEffect } from 'react';
import { useStyle } from '../utils/style';
import { Text, View, Button } from 'react-native';
import { toVND } from '../utils/CurrencyHelper';

function AdditionalItem({ item, onAmountChange, oldAmount }) {

  const [amount, setAmount] = useState(0);

  const styles = useStyle();

  useEffect(() => {
    if(!oldAmount) oldAmount = 0;
    setAmount(oldAmount);
  },[])

  const onAdd = () => {
    const value = amount + 1;
    setAmount(value);
    if (onAmountChange) {
      onAmountChange(item, value);
    }
  }

  const onSubtract = () => {
    // if (oldAmount && amount == oldAmount){

    // }else 
    
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
        <Text>{amount==0?oldAmount?oldAmount:0:amount}</Text>
        <Button title='+' onPress={onAdd} />
      </View>
    </View>
  );
}

export default AdditionalItem;