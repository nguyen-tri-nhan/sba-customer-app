import React from 'react';
import { StyleSheet,SafeAreaView, TouchableOpacity,Modal,
  View, 
  ActivityIndicator,Platform} from 'react-native';
import { useEffect, useState, useContext } from 'react';
import BookingStepIndicator from '../components/BookingStepIndicator';
import { Text } from '../components/Themed';
import Services from '../utils/Services';
import { Button, Card } from 'react-native-paper';
import { useStyle } from '../utils/style';
import { toVND, toUSD } from '../utils/CurrencyHelper';
// import Paypal from '../components/Paypal';
// import { RNPaypal } from 'react-native-paypal'; 
// import { PayPalButton } from "react-paypal-button-v2";

import {WebView} from 'react-native-webview';
import Feather from 'react-native-vector-icons/Feather';
import { addDate, ago } from '../utils/DateHelper';
import { AuthContext } from "../utils/context";
import { DressDateNotification, paymentUrl, PhotoDateNotification } from '../utils/Constants';




function Payment(props) {
  const { navigation, route } = props;
  const { params } = route;
  const { pkg, jwt, forwardedItems, user, totalPrice, showroom, dressDate, startDate, getDate } = params;
  const isAndroid = Platform.OS === 'android';
  const styles = useStyle();
  const onContinuePress = () => {
    navigation.navigate("SuccessScreen", { showroom });
  }

  const [showGateway, setShowGateway] = useState(false);
  const [prog, setProg] = useState(false);
  const [progClr, setProgClr] = useState('#000');
  const url = `${paymentUrl}/price=`+toUSD(totalPrice);

  const { scheduleNotification } = useContext(AuthContext);

  function onMessage(e) {
    let data = e.nativeEvent.data;
    setShowGateway(false);
    

    Date.prototype.addDays = function (days) {
      const date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    let payment = JSON.parse(data);
    if (payment.status === 'COMPLETED') {
      Services.booking({
        showroomId: showroom.id,
        packageId: pkg.id,
        customerId: user.id,
        items: forwardedItems,
        departureDate: startDate,
        returnDate: addDate(startDate,pkg.duration - 1),
        photoReceiptDate:getDate,
        adviceDate: dressDate
      }, jwt).then((response) => {
        const dressNotification = DressDateNotification(showroom);
        const photoNotification = PhotoDateNotification(showroom);
        scheduleNotification(ago(-1, dressDate), dressNotification.title, dressNotification.body, dressNotification.data);        
        scheduleNotification(ago(-1, startDate), photoNotification.title, photoNotification.body, photoNotification.data);        
        onContinuePress();
      })
    } else {
      alert('THANH TOÁN LỖI. VUI LÒNG THANH TOÁN LẠI.');
    }
  }
  
  return (
    <SafeAreaView style={styles.packageDetailsContainer}>
      <BookingStepIndicator currentStep={2} />
      <Card style={styles.customerInformation}>
      <View style={stylesA.container}>
        <View style={[stylesA.conText,{marginTop:20}]}>
          <Text style={[stylesA.h1,{marginBottom:20}]}>Tổng tiền : </Text>
          <Text style={[stylesA.h1,{marginBottom:20}]}>{toVND(totalPrice)}</Text>
        </View>
          
        <View style={stylesA.divineLine} />
        <View style={stylesA.conText}>
              <Text style={[stylesA.text,{marginBottom:10}]}>{pkg.name} :</Text>
              <Text style={[stylesA.text,{marginBottom:10}]}>{toVND(pkg.price)}</Text>
          </View>
          {
              forwardedItems.map((item) =>
              (<View key={item.id} style={stylesA.conText}>
                  <Text style={[stylesA.text,{marginBottom:10}]}>{item.itemName} :</Text>
                  <Text style={[stylesA.text,{marginBottom:10}]}>{toVND(item.price * item.amount)}</Text>
              </View>
              ))
            }
        
        <View style={stylesA.divineLine} />
        <View style={stylesA.conText}>
          <Text style={stylesA.text}>Thanh toán phần cọc :</Text>
          <Text style={stylesA.text}>{toVND(totalPrice)}</Text>
         </View>
         
         <View style={[stylesA.divineLine,{marginTop:40}]} />
      </View>
      <View style={stylesA.containerBtn}>
        
        <View style={stylesA.btnCon}>
          <TouchableOpacity
            style={stylesA.btn}
            onPress={() => setShowGateway(true)}>
            <Text style={stylesA.btnTxt}>Thanh toán PayPal</Text>
          </TouchableOpacity>
        </View>
      </View>
      {showGateway ? (
        <Modal
          visible={showGateway}
          onDismiss={() => setShowGateway(false)}
          onRequestClose={() => setShowGateway(false)}
          animationType={'fade'}
          // transparent={true}
          >
          <View style={[stylesA.webViewCon,{top:isAndroid?0:50}]}>
            <View style={stylesA.wbHead}>
              <TouchableOpacity
                style={{padding: 13}}
                onPress={() => setShowGateway(false)}>
                <Feather name={'x'} size={30} />
              </TouchableOpacity>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#00457C',
                }}>
                PayPal GateWay
              </Text>
              <View style={{padding: 13, opacity: prog ? 1 : 0}}>
                <ActivityIndicator size={24} color={progClr} />
              </View>
            </View>
            <WebView
              source={{uri: url}}
              style={{flex: 1}}
              onLoadStart={() => {
                setProg(true);
                setProgClr('#000');
              }}
              onLoadProgress={() => {
                setProg(true);
                setProgClr('#00457C');
              }}
              onLoadEnd={() => {
                setProg(false);
              }}
              onLoad={() => {
                setProg(false);
              }}
              onMessage={onMessage}
            />
          </View>
        </Modal>
      ) : null}

        
      </Card>
    </SafeAreaView>
  );
}
const stylesA = StyleSheet.create({
  containerBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  container: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  btnCon: {
    height: 45,
    width: '70%',
    elevation: 1,
    backgroundColor: '#00457C',
    borderRadius: 3,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnTxt: {
    color: '#fff',
    fontSize: 18,
  },
  h1: {
    color: '#000',
    fontSize: 20,
    justifyContent: 'center'
  },
  text: {
    color: '#000',
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  webViewCon: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
  },
  wbHead: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    zIndex: 25,
    elevation: 2,
  },
  conText:{
    flexDirection:"row",
    justifyContent:"space-between",
    // backgroundColor:"#000",
    width:"90%"
  },
  
  divineLine: {
    width: "90%",
    height: 1,
    opacity: 0.5,
    marginBottom: 5,
    backgroundColor: "#4A4A4A"
  }
});

export default Payment;