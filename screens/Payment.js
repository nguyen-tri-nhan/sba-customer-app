import React from 'react';
import { StyleSheet,SafeAreaView, TouchableOpacity,Modal,
  View, 
  ActivityIndicator} from 'react-native';
import { useEffect, useState } from 'react';
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


function Payment(props) {
  const { navigation, route } = props;
  const { params } = route;
  const { pkg, forwardedItems, totalPrice, showroom } = params;
  const styles = useStyle();
  const onContinuePress = () => {
    navigation.navigate("SuccessScreen", { pkg });
  }

  const [showGateway, setShowGateway] = useState(false);
  const [prog, setProg] = useState(false);
  const [progClr, setProgClr] = useState('#000');
  const url = 'http://192.168.1.173:3000/price='+toUSD(totalPrice);
  function onMessage(e) {
    let data = e.nativeEvent.data;
    setShowGateway(false);
    console.log(data);
    let payment = JSON.parse(data);
    if (payment.status === 'COMPLETED') {
      onContinuePress();
    } else {
      alert('PAYMENT FAILED. PLEASE TRY AGAIN.');
    }
  }
  
  return (
    <SafeAreaView style={styles.packageDetailsContainer}>
      <BookingStepIndicator currentStep={2} />
      <Card style={styles.customerInformation}>
      <View style={stylesA.container}>
          <Text style={stylesA.h1}>Tổng tiền : {toVND(totalPrice)}</Text>
          <Text style={stylesA.text}>Tên gói : {pkg.name}</Text>
          <Text style={stylesA.text}>Tổng tiền : {toVND(totalPrice)}</Text>
      </View>
      <View style={stylesA.container}>
        
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
          transparent>
          <View style={stylesA.webViewCon}>
            <View style={stylesA.wbHead}>
              <TouchableOpacity
                style={{padding: 13}}
                onPress={() => setShowGateway(false)}>
                <Feather name={'x'} size={24} />
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

      {/* <Card style={styles.packageDetailsFooter}>
        <TouchableOpacity onPress={onContinuePress} style={styles.packageDetailsBookingButton}>
          <Button>Tiếp tục: {toVND(totalPrice)}</Button>
        </TouchableOpacity>
      </Card> */}
    </SafeAreaView>
  );
}
const stylesA = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 25,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  text: {
    color: '#000',
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  webViewCon: {
    position: 'absolute',
    top: 0,
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
});

export default Payment;