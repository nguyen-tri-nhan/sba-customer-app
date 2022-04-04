import React from 'react';
import { SafeAreaView, TouchableOpacity, View, StyleSheet, Text, Image } from 'react-native';
import { useEffect, useState } from 'react';
import BookingStepIndicator from '../components/BookingStepIndicator';
import Services from '../utils/Services';
import { Button, Card } from 'react-native-paper';
import { useStyle } from '../utils/style';
import { toVND } from '../utils/CurrencyHelper';
import { ScrollView } from 'react-native-gesture-handler';
import StyleItem from '../components/StyleItem'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { result } from 'lodash';
import axios from 'axios';

function PreviewMakeupScreen(props) {
  const { navigation, route } = props;
  const { params } = route;
  const { pkg } = params;
  const styles = useStyle();
  // const onContinuePress = () => {
  //   navigation.push("SuccessScreen", { pkg });
  // }

  const [image, setImage] = useState(null);

  useEffect(() => {
    (() => {
      if (Platform.OS !== 'web') {
        const picker = ImagePicker.requestMediaLibraryPermissionsAsync();
        const camera = ImagePicker.requestCameraPermissionsAsync();
        Promise.all([picker, camera]).then(([pickerResponse, cameraResponse]) => {
          if (cameraResponse.status !== 'granted' || pickerResponse.status !== 'granted') {
            alert('Bạn chưa cấp quyền cho camera hoặc thư viện ảnh để sử dụng tính năng này')
          }
        })

      }
    })();
  }, []);


  const handleOpenCamera = () => {
    const result = ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64:true
    });
    result.then((response) => {
      if (!response.cancelled) {
        setImage(response.uri)
      }
    })
  };

  const handleOpenLibrary = () => {
    let result = ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    result.then((response) => {
      if (!response.cancelled) {
        setImage(response.uri);
      }
    })
  };


  function dataURLtoFile(dataurl, filename) {
 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
}



  const onTryPress = () => {
    
      // console.log(image)
      // const file = dataURLtoFile(image,"img.jpg")
        // Services.uploadFile("@aa89e800-f7e6-46a6-ab42-2f06fbd6e689.jpg").then((res) => {
        //   // console.log(res)
        // })
        // let img = new FormData();
        // img.append('file', { uri: image });
        // img.append("random","a");
        // img.append('userId', 'b');
   

    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "multipart/form-data");

    var formdata = new FormData();
    formdata.append('img',{ uri: image, name: 'image.jpg', type: 'image/jpeg' });
    formdata.append("random", "true");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://192.168.3.100:8000/makeup", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

  }

  return (
    <SafeAreaView style={styles.packageDetailsContainer}>
      <Card style={styles.customerInformation}>
        <View style={{width:200,height:200,alignSelf:'center',marginTop:40}}>
          <Image source={image ? { uri: image } : require("../assets/images/aaa.png")}
            style={{ flex: 1, width: 200, height: 50, alignSelf: 'center', marginTop: 10, resizeMethod: 'resize', resizeMode: 'contain' }}>
          </Image>
        </View>

        <View style={{
          height: 130, marginTop: 20, flex: 1,
          justifyContent: 'flex-end',
          marginBottom: 36
        }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={stylesA.btnCon}>
              <TouchableOpacity
                style={stylesA.btn}
                onPress={handleOpenLibrary}>
                <Text style={stylesA.btnTxt}>Chọn ảnh</Text>
              </TouchableOpacity>
            </View>

            <View style={stylesA.btnCon}>
              <TouchableOpacity
                style={stylesA.btn}
                onPress={handleOpenCamera}>
                <Text style={stylesA.btnTxt}>Chụp ảnh</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView style={{ position: 'absolute', bottom: 0 }} horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <StyleItem />
            <StyleItem />
            <StyleItem />
            <StyleItem />
          </ScrollView>
        </View>
      </Card>
      <Card style={styles.packageDetailsFooter}>
        <TouchableOpacity onPress={onTryPress} style={styles.packageDetailsBookingButton}>
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
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  btnCon: {
    height: 40,
    width: '40%',
    elevation: 1,
    backgroundColor: '#00457C',
    borderRadius: 3,
    bottom: 150,
    marginLeft: 20,
    marginRight: 20
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