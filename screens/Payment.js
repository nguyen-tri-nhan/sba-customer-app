import React from 'react';
import { StyleSheet,SafeAreaView, TouchableOpacity,Modal,View,ActivityIndicator,Platform,ScrollView,Pressable} from 'react-native';
import { useEffect, useState } from 'react';
import BookingStepIndicator from '../components/BookingStepIndicator';
import { Text } from '../components/Themed';
import Services from '../utils/Services';
import { Button, Card } from 'react-native-paper';
import { useStyle } from '../utils/style';
import { toVND, toUSD } from '../utils/CurrencyHelper';
import Icon from "react-native-dynamic-vector-icons";

import {WebView} from 'react-native-webview';
import Feather from 'react-native-vector-icons/Feather';
import { addDate } from '../utils/DateHelper';


import CryptoJS from 'crypto-js';
import {NativeModules, NativeEventEmitter } from 'react-native';


const { PayZaloBridge } = NativeModules;

const payZaloBridgeEmitter = new NativeEventEmitter(PayZaloBridge);

const subscription = payZaloBridgeEmitter.addListener(
  'EventPayZalo',
  (data) => {
    if (data.returnCode == 1) {
      alert('Pay success!');
    } else {
      alert('Pay errror! ' + data.returnCode);
    }
  }
);



function Payment(props) {
  const { navigation, route } = props;
  const { params } = route;
  const { pkg, jwt, forwardedItems, user, totalPrice, showroom, dressDate, startDate, getDate,slot } = params;
  const isAndroid = Platform.OS === 'android';
  const styles = useStyle();
  const onContinuePress = (id) => {
    navigation.navigate("SuccessScreen", { id });
  }

  const [showGateway, setShowGateway] = useState(false);
  const [prog, setProg] = useState(false);
  const [progClr, setProgClr] = useState('#000');
  // const url = 'http://192.168.88.171:3000/price='+toUSD(totalPrice);

  
  const [modalVisible, setModalVisible] = useState(false);

  function onMessage(e) {
    let data = e.nativeEvent.data;
    setShowGateway(false);
    console.log(data);
    
  }

  //zalopay
  const [token, setToken] = React.useState('')
  const [returncode, setReturnCode] = React.useState('')
  const [url,setURL] = useState('')
  

  function getCurrentDateYYMMDD() {
    var todayDate = new Date().toISOString().slice(2, 10);
    return todayDate.split('-').join('');
  }

  async function createOrder() {
    let apptransid = getCurrentDateYYMMDD() + '_' + new Date().getTime()

    let appid = 2553
    let amount = 100000
    let appuser = "ZaloPayDemo"
    let apptime = (new Date).getTime()
    let embeddata = "{}"
    let item = "[]"
    let description = "Merchant description for order #" + apptransid
    let hmacInput = appid + "|" + apptransid + "|" + appuser + "|" + amount + "|" + apptime + "|" + embeddata + "|" + item
    let mac = CryptoJS.HmacSHA256(hmacInput, "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL")
    console.log('====================================');
    console.log("hmacInput: " + hmacInput);
    console.log("mac: " + mac)
    console.log('====================================');
    var order = {
      'app_id': appid,
      'app_user': appuser,
      'app_time': apptime,
      'amount': amount,
      'app_trans_id': apptransid,
      'embed_data': embeddata,
      'item': item,
      'description': description,
      'mac': mac
    }


    let formBody = []
    for (let i in order) {
      var encodedKey = encodeURIComponent(i);
      var encodedValue = encodeURIComponent(order[i]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    await fetch('https://sb-openapi.zalopay.vn/v2/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    }).then(response => response.json())
      .then(resJson => {
        setToken(resJson.zp_trans_token)
        setReturnCode(resJson.return_code)
        setURL(resJson.order_url)
        console.log(resJson);
      })
      .catch((error) => {
        console.log("error ", error)
      })
  }

  function payOrder() {
    var payZP = NativeModules.PayZaloBridge;
    payZP.payOrder(token);
    console.log("aaa")
  }


  return (
    <SafeAreaView style={styles.packageDetailsContainer}>
      <BookingStepIndicator currentStep={2} />
      <Card style={[styles.customerInformation,{justifyContent:'space-between'}]}>
      <ScrollView>
       <View style={stylesA.containerBtn}> 
          <View style={stylesA.btnCon}>
            <TouchableOpacity
              style={stylesA.btn}
              onPress={() => createOrder()}>
              <Text style={stylesA.btnTxt}>Tạo order</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.welcome}>ZpTranstoken: {token}</Text>
        <Text style={styles.welcome}>returncode: {returncode}</Text>
        {returncode == 1 ?
          <View style={stylesA.containerBtn}> 
          <View style={stylesA.btnCon}>
            <TouchableOpacity
              style={stylesA.btn}
              onPress={() => payOrder()}>
              <Text style={stylesA.btnTxt}>Thanh toán Zalo</Text>
            </TouchableOpacity>
          </View>
        </View> : null
        }

        


        {/* <View style={stylesA.containerBtn}> 
          <View style={stylesA.btnCon}>
            <TouchableOpacity
              style={stylesA.btn}
              onPress={() => setShowGateway(true)}>
              <Text style={stylesA.btnTxt}>Thanh toán PayPal</Text>
            </TouchableOpacity>
          </View>
        </View> */}
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


      </ScrollView>
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
    justifyContent: 'center',
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
    width:"90%",
    marginHorizontal:15,
  },
  
  divineLine: {
    width: "90%",
    height: 1,
    opacity: 0.5,
    marginBottom: 5,
    backgroundColor: "#4A4A4A",
    alignSelf:'center'
  },
  conRow:{
    flexDirection:"row",
    marginBottom:15
  },
  textIcon:{
    top:10,
    marginLeft:20,
  }
  ,centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    
    width:"80%"
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width:80
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalTitle:{
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Payment;