import React from 'react';
import { StyleSheet,SafeAreaView, TouchableOpacity,Modal,View,ActivityIndicator,Platform,
  ScrollView,Pressable} from 'react-native';
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
import { paypal } from '../utils/Constants';


import RNMomosdk from 'react-native-momosdk';
import { NativeModules,NativeEventEmitter } from 'react-native';
const RNMoMoPaymentModule = NativeModules.RNMomosdk;
const EventEmitter = new NativeEventEmitter(RNMoMoPaymentModule);



function PaymentEdit(props) {
  const { navigation, route } = props;
  const { params } = route;
  const { 
    booking,
    additionalItems, 
    jwt, } = params;
  const isAndroid = Platform.OS === 'android';
  const styles = useStyle();
  const onContinuePress = (id) => {
    navigation.navigate("SuccessScreen", { id });
  }

  const [showGateway, setShowGateway] = useState(false);
  const [prog, setProg] = useState(false);
  const [progClr, setProgClr] = useState('#000');
  const url = paypal+'/price='+toUSD(getPaidTotal());

  const [loading,setLoading] = useState(false);




  //TODO: add to price



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
      
      setLoading(true);
      additionalItems.forEach((ele) => {
        if(!ele.amount) {ele.amount = 0;}
      })


    const updateItem = Services.updateBookingItems(booking.id, { items: additionalItems }, jwt);
    const updateTransaction = Services.updateBookingTransaction(booking.id,
      {transactionId:payment.id,
        amount:getPaidTotal(),
        paymentType:"PAYPAL",
        paymentDesc:"Thanh toan " + toVND(getPaidTotal())
      },jwt
      )
      
      if(additionalItems.length>0){
        Promise.all([updateItem,updateTransaction]).then(() => {
          console.log('thanh toan thanh cong paypal');
          
          setLoading(false);
          navigation.reset({
            index: 0,
            routes: [{ name: 'History' }],
          });
        })
      }else{
        Promise.all([updateTransaction]).then(() => {
          console.log('thanh toan thanh cong paypal');
          
          setLoading(false);
          navigation.reset({
            index: 0,
            routes: [{ name: 'History' }],
          });
        })
      }
    
     
    } else {
      alert('THANH TOÁN LỖI. VUI LÒNG THANH TOÁN LẠI.');
    }
  }


 
  const merchantcode = "MOMOM8AV20220409";
  const merchantNameLabel = "Nhà cung cấp";
  const enviroment = "0"; //"0": SANBOX , "1": PRODUCTION


  function getCurrentDateYYMMDD() {
    var todayDate = new Date().toISOString().slice(2, 10);
    return todayDate.split('-').join('');
  }

  const onPress = async () => {
    let jsonData = {};
    jsonData.enviroment = enviroment; //SANBOX OR PRODUCTION
    jsonData.action = "gettoken"; //DO NOT EDIT
    jsonData.merchantname = booking.name; //edit your merchantname here
    jsonData.merchantcode = merchantcode; //edit your merchantcode here
    jsonData.merchantnamelabel = merchantNameLabel;
    jsonData.description = booking.name;
    // jsonData.amount = totalPrice;//order total amount
    jsonData.amount = getPaidTotal();
    jsonData.orderId = getCurrentDateYYMMDD() + '_' + new Date().getTime();
    jsonData.orderLabel = "Ma don hang";
    jsonData.appScheme = "momom8av20220409";// iOS App Only , match with Schemes Indentify from your  Info.plist > key URL types > URL Schemes
    // jsonData.handleAppNotInstalledBySelf = "1";
    console.log("data_request_payment " + JSON.stringify(jsonData));
    if (Platform.OS === 'android'){
      let dataPayment = await RNMomosdk.requestPayment(jsonData);
      momoHandleResponse(dataPayment);
    }else{
      console.log("ios open momo json");
      RNMomosdk.requestPayment(JSON.stringify(jsonData));
    }
    
   
  }
  const  momoHandleResponse = async (response) => {
    
    try{
      if (response && response.status == 0) {
        console.log("momoHandleResponse ==== ", response)
        //SUCCESS continue to submit momoToken,phonenumber to server
        setLoading(true);
        let orderId = response.orderId
        additionalItems.forEach((ele) => {
          if(!ele.amount) {ele.amount = 0;}
        })

        
        Services.updateBookingItems(booking.id, { items: additionalItems }, jwt)
        .then(() => {
          // TODO: success message.
          // navigation.goBack();
          
        })

        Services.updateBookingTransaction(booking.id,
          {
            transactionId:orderId,
            amount:getPaidTotal(),
            paymentType:"MOMO",
            paymentDesc:"Thanh toan " + toVND(getPaidTotal())
            },jwt).then(() => {
              console.log('thanh toan thanh cong momo');
              setLoading(false);
            navigation.reset({
              index: 0,
              routes: [{ name: 'History' }],
            });
          })

          const updateItem = Services.updateBookingItems(booking.id, { items: additionalItems }, jwt);
    const updateTransaction = Services.updateBookingTransaction(booking.id,
      {
        transactionId:orderId,
        amount:getPaidTotal(),
        paymentType:"MOMO",
        paymentDesc:"Thanh toan " + toVND(getPaidTotal())
      },jwt
      )
      
      if(additionalItems.length>0){
        Promise.all([updateItem,updateTransaction]).then(() => {
          console.log('thanh toan thanh cong momo');
          
          setLoading(false);
          navigation.reset({
            index: 0,
            routes: [{ name: 'History' }],
          });
        })
      }else{
        Promise.all([updateTransaction]).then(() => {
          console.log('thanh toan thanh cong paypal');
          
          setLoading(false);
          navigation.reset({
            index: 0,
            routes: [{ name: 'History' }],
          });
        })
      }
    
  
  
      } else {
        //let message = response.message;
        //Has Error: show message here
        console.log("error ",response)
        alert('THANH TOÁN LỖI. VUI LÒNG THANH TOÁN LẠI.');
      }
    }catch(ex){}
  }


  useEffect(() =>{
    // Listen for native events
    EventEmitter.addListener('RCTMoMoNoficationCenterRequestTokenReceived', (response) => {
        console.log("<MoMoPay>Listen.Event::" + JSON.stringify(response));
        try{
              if (response && response.status == 0) {
                let fromapp = response.fromapp; //ALWAYS:: fromapp==momotransfer
                let momoToken = response.data;
                let phonenumber = response.phonenumber;
                let message = response.message;
                let orderId = response.refOrderId; //your orderId
                let requestId = response.refRequestId; //your requestId
                //continue to submit momoToken,phonenumber to server
              } else {
                console.log( "message: Get token fail")
              }
        }catch(ex){}

    });
    
    //OPTIONAL
    EventEmitter.addListener('RCTMoMoNoficationCenterRequestTokenState',(response) => {
        console.log("<MoMoPay>Listen.RequestTokenState:: " + response.status);
        // status = 1: Parameters valid & ready to open MoMo app.
        // status = 2: canOpenURL failed for URL MoMo app 
        // status = 3: Parameters invalid
    })
  },[]);

  const checkEdit = () => {
    let total = 0;
    let price = 0;
    additionalItems.forEach((ele) => {
      total += ele.amount * ele.price
    });
    booking.items.forEach((ele) => {
      price += ele.amount * ele.price
    });
      return total!=price
  }

  function getPaidTotal()  {
      let price = 0;
      additionalItems.forEach((ele) => {
        price += ele.amount * ele.price
      });
      booking.items.forEach((ele) => {
        price -= ele.amount * ele.price
      });
      if(price < 0) price=0
      return booking.totalPrice +price - booking.paid
  }
  return (
    <SafeAreaView style={[styles.packageDetailsContainer,{opacity:!loading?1:0.3}]}>
      <BookingStepIndicator currentStep={2} />
      <Card style={[styles.customerInformation,{justifyContent:'space-between'}]}>
      <ScrollView>
        <View style={stylesA.container}>
          
      {loading && ( <ActivityIndicator size="large" color="#0000ff" style={{position:'absolute',alignSelf:'center',top:"80%"}} />)}
          <View style={[stylesA.conText,{marginTop:20}]}>
            <Text style={[stylesA.h1,{marginBottom:20}]}>Tổng tiền : </Text>
            <Text style={[stylesA.h1,{marginBottom:20}]}>{toVND(getPaidTotal())}</Text>
          </View>

            {
              (additionalItems.length>0 && checkEdit())?<View style={stylesA.divineLine} />:<></>
            }
            {
              (additionalItems.length>0 && checkEdit())?(
              <View style={stylesA.conRow}>
              <Icon
                name="add-to-list"
                type="Entypo"
                size={30}
              />
                <Text style={[stylesA.text,stylesA.textIcon]}>
                  Dịch vụ thêm :
                </Text>
              </View>):<></>
            }
            {
                (checkEdit())?
                (additionalItems.map((item) =>
                (<View key={item.id} style={stylesA.conText}>
                    <Text style={[stylesA.text,{marginBottom:10}]}>{item.itemName} :</Text>
                    <Text style={[stylesA.text,{marginBottom:10}]}>{toVND(item.price * item.amount)}</Text>
                </View>
                ))):<></>
              }
          <View style={stylesA.divineLine} />
          <View style={stylesA.conText}>
            <Text style={stylesA.text}>Đã thanh toán :</Text>
            <Text style={stylesA.text}>{toVND(booking.paid)}</Text>
          </View>
          <View style={stylesA.divineLine} />
          <View style={stylesA.conText}>
            <Text style={stylesA.text}>Số tiền còn lại :</Text>
            <Text style={stylesA.text}>{toVND(getPaidTotal())}</Text>
          </View>
          
          <View style={[stylesA.divineLine,{marginTop:10}]} />
        </View>
        <View style={[stylesA.containerBtn,{marginBottom:20,marginTop:20}]}>
          
          <View style={[stylesA.btnCon,{backgroundColor:"#a50064"}]}>
            <TouchableOpacity
              style={stylesA.btn}
              onPress={() => onPress()}>
              <Text style={stylesA.btnTxt}>Thanh toán Momo</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[stylesA.containerBtn,{marginBottom:50}]}>
          
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

export default PaymentEdit;