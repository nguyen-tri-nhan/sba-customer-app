import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity, ScrollView, View,StyleSheet } from 'react-native';
import BookingStepIndicator from '../components/BookingStepIndicator';
import { Text } from '../components/Themed';
import { Button, Card } from 'react-native-paper';
import { useStyle } from '../utils/style';
import { toVND } from '../utils/CurrencyHelper';
import DatePicker from '../components/DatePicker';
import TimePicker from '../components/TimePicker';

function ConfirmationScreen(props) {
  const { navigation, route } = props;
  const { params } = route;
  const { pkg, jwt, user, forwardedItems, totalPrice, showroom } = params;
  const [dressDate, setDressDate] = useState();
  const [dressTime, setDressTime] = useState();

  const styles = useStyle();
  const onContinuePress = () => {
    navigation.push("Payment", { pkg, forwardedItems, totalPrice, showroom });
  }

  console.log(forwardedItems);
  console.log(dressDate);
  return (
    <SafeAreaView style={styles.packageDetailsContainer}>
      <BookingStepIndicator currentStep={1} />
      <Card style={styles.customerInformation}>
        <ScrollView>
          <View style={styleA.container}>
            <Text style={styleA.h1}>
                XÁC NHẬN
            </Text >
            <Text style={styleA.h2}>
              Gói dịch vụ: {pkg.name}
            </Text>
            <Text style={styleA.h3}>
              Địa điểm: {pkg.location}
            </Text>
            <Text style={styleA.h3}>
              Chi nhánh thực hiện: {showroom.name}
            </Text>
            <Text style={styleA.h3}>
              Địa chỉ: {showroom.address}
            </Text>
            <Text style={styleA.h3}>
              Dịch vụ thêm:
            </Text>
            {
              forwardedItems.map((item) =>
              (<View key={item.id}>
                <Text style={styleA.h3}>{item.itemName} {item.amount}</Text>
              </View>))
            }
            <Text>
              Ngày thử đồ:
            </Text>
            <DatePicker onConfirm={setDressDate} />
            <TimePicker onConfirm={setDressTime} />
          </View>
        </ScrollView>
      </Card>
      <Card style={styles.packageDetailsFooter}>
        <TouchableOpacity onPress={onContinuePress} style={styles.packageDetailsBookingButton}>
          <Button>Thanh toán: {toVND(totalPrice)}</Button>
        </TouchableOpacity>
      </Card>
    </SafeAreaView>
  );
}

const styleA = StyleSheet.create({
  container:{
    marginLeft:10,
    marginRight:10,
    marginTop:30
  },
  h1:{
    fontWeight:'bold',
    fontSize:20,
    marginBottom:30,
    alignSelf:'center',
    color:'#FB6F6F'
  },
  h2:{
    fontWeight:'bold',
    fontSize:17,
    marginBottom:15,
  },
  h3:{
    
    fontSize:15,
    marginBottom:15,
  }
})
export default ConfirmationScreen;