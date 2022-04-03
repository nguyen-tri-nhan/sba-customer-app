import React from 'react';
import { SafeAreaView, TouchableOpacity,View ,StyleSheet,Text,Image} from 'react-native';
import { useEffect, useState } from 'react';
import BookingStepIndicator from '../components/BookingStepIndicator';
import Services from '../utils/Services';
import { Button, Card } from 'react-native-paper';
import { useStyle } from '../utils/style';
import { toVND } from '../utils/CurrencyHelper';
import { ScrollView } from 'react-native-gesture-handler';
import StyleItem from '../components/StyleItem'
import {launchCamera, launchImageLibrary} from "react-native-image-picker"

function PreviewMakeupScreen(props) {
  const { navigation, route } = props;
  const { params } = route;
  const { pkg } = params;
  const styles = useStyle();
  const onContinuePress = () => {
    navigation.push("SuccessScreen", { pkg });
  }
  const handleChoosePhoto = () => {
    const options = {
      
    }

    launchImageLibrary(options, response => {
      console.log("res",response)
    })
  }
  return (
    <SafeAreaView style={styles.packageDetailsContainer}>
      <BookingStepIndicator currentStep={3} />
      <Card style={styles.customerInformation}>
      <Image source = {require("../assets/style_14.jpg")}
                style={{flex: 1, width: 200, height: 50, alignSelf:'center',marginTop:10,resizeMethod:'resize',resizeMode:'contain'}}>
                </Image>
      
        <View style={{height: 130,marginTop: 20,flex: 1,
                    justifyContent: 'flex-end',
                    marginBottom: 36}}>
        <View style={{flexDirection: "row", justifyContent:"space-between"}}> 
      <View style={stylesA.btnCon}>
          <TouchableOpacity
            style={stylesA.btn}
            onPress={handleChoosePhoto}>
            <Text style={stylesA.btnTxt}>Chọn ảnh</Text>
          </TouchableOpacity>
        </View>

        <View style={stylesA.btnCon}>
          <TouchableOpacity
            style={stylesA.btn}
            onPress={() => setShowGateway(true)}>
            <Text style={stylesA.btnTxt}>Chụp ảnh</Text>
          </TouchableOpacity>
        </View>
        </View>              
      
        <ScrollView style={{position: 'absolute',bottom:0}} horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <StyleItem/>
            <StyleItem/>
            <StyleItem/>
            <StyleItem/>
        </ScrollView>
        </View>
      </Card>
      <Card style={styles.packageDetailsFooter}>
        <TouchableOpacity onPress={onContinuePress} style={styles.packageDetailsBookingButton}>
          <Button>Thử ngay</Button>
        </TouchableOpacity>
      </Card>
    </SafeAreaView>

  );
}

const stylesA = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignSelf:'center',
    
    justifyContent: 'flex-end',
  },
  btnCon: {
    height: 40,
    width: '40%',
    elevation: 1,
    backgroundColor: '#00457C',
    borderRadius: 3,
    bottom:150,
    marginLeft:20,
    marginRight:20

  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnTxt: {
    color: '#fff',
    fontSize: 15,
  }
});


export default PreviewMakeupScreen;