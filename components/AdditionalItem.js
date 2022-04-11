import React, { useState,useEffect } from 'react';
import { useStyle } from '../utils/style';
import { Text, View, Button,StyleSheet } from 'react-native';
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
      <Text style={stylesA.text}>{item.itemName}</Text>
      <View style={styles.additionalItemAmount}>
        <Text style={stylesA.text}>{toVND(item.price)}</Text>
        <Button title='-' onPress={onSubtract} style={stylesA.btn}/>
        <Text style={stylesA.text}>{amount==0?oldAmount?oldAmount:0:amount}</Text>
        <Button title='+' onPress={onAdd} style={stylesA.btn}/>
      </View>
    </View>
  );
}

const stylesA = StyleSheet.create({
  btn:{
    marginHorizontal:10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#fff',
  },
  text:{
    marginHorizontal:10,
    fontSize:13
  }
})

export default AdditionalItem;