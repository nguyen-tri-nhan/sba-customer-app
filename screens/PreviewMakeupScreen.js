import React from 'react';
import { SafeAreaView, TouchableOpacity, View, StyleSheet, Text, Image,Modal,Pressable,ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import BookingStepIndicator from '../components/BookingStepIndicator';
import Services from '../utils/Services';
import { Button, Card } from 'react-native-paper';
import { useStyle } from '../utils/style';
import { ScrollView } from 'react-native-gesture-handler';
import StyleItem from '../components/StyleItem'
import * as ImagePicker from 'expo-image-picker';
import { result } from 'lodash';
import axios from 'axios';
import DataLoader from '../model/Dataloader';
import { ENTITY } from '../utils/Constants';
import Feather from 'react-native-vector-icons/Feather';
import { ai_domain } from '../utils/Constants';

function PreviewMakeupScreen(props) {
  const { navigation, route } = props;
  const { params } = route;
  const { id,jwt } = params;
  const styles = useStyle();
  // const onContinuePress = () => {
  //   navigation.push("SuccessScreen", { pkg });
  // }

  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(true);
  const [modalValidVisible, setModalValidVisible] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  
  const [loading,setLoading] = useState(false);

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
      aspect: [3, 4],
      quality: 1,
      base64:true
    });
    result.then((response) => {
      if (!response.cancelled) {
        setImage(response.uri);
      }
    })
  };

  const handleOpenLibrary = () => {
    let result = ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1
    });
    result.then((response) => {
      if (!response.cancelled) {
        setImage(response.uri);
      }
    })
  };

  
  let stylesData = {};

  const [styleList,setStyleList] = useState(new Map())

  const onSelectedStyle = (id,name,url) => {
    // if(id && url && stylesData && !stylesData[id]){
    //   stylesData[id]=url;
    // }
    setStyleList(styleList.set(id,name+"_"+url))
  }

  const onRemoveStyle = (id) => {
    // if(id && url && stylesData[id]){
    //   stylesData[id]="";
    // }
    setStyleList(styleList.set(id,""))
  }

  const onTryPress = () => {
    
      // console.log(styleList)
      // const file = dataURLtoFile(image,"img.jpg")
        // Services.uploadFile("@aa89e800-f7e6-46a6-ab42-2f06fbd6e689.jpg").then((res) => {
        //   // console.log(res)
        // })
        // let img = new FormData();
        // img.append('file', { uri: image });
        // img.append("random","a");
        // img.append('userId', 'b');
    
    
    if(image){
      setLoading(true)
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "multipart/form-data");

      var formdata = new FormData();
      formdata.append('img',{ uri: image, name: 'image.jpg', type: 'image/jpeg' });
      formdata.append("bookingId", id);
      
      for(const [id, url] of styleList.entries()){
        if(url.length > 0){
          formdata.append("styles", id+"_"+url);
        }
      }
      

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

      fetch(ai_domain, requestOptions)
        .then(response => response.text())
        .then(result => {
          result = JSON.parse(result)
          const msg = result.msg;
          const links = result.links;
          // const links = [
          //   {
          //       "refer": "https://i.pinimg.com/564x/db/cf/e3/dbcfe345c0836740c7811e9beadbfd32.jpg",
          //       "result": "https://fpt-sba-images.s3.ap-southeast-2.amazonaws.com/5a4b586cbbdf4e7cbb0e21c97f0189e2",
          //       "source":image,
          //       "bookingId":"1",
          //       "idStyle": "1",
          //       "name":"all natural"

          //   }
          // ]
          console.log(result.links);
          if(msg == "success"){
            console.log('success');
            setLoading(false);
            navigation.push("ResultScreen", { links:links,jwt:jwt});
          }else{
            setErrorModal(true);
            setLoading(false);
          }
          
        })
        .catch(error => {console.log('error', error);
            setErrorModal(true);
            setLoading(false);
      });
    }else{
      setModalValidVisible(true)
    }
    
  }


  const renderStyle = (data) => {
      return data.map((item) => (<StyleItem item={item} onSelectedStyle={onSelectedStyle} onRemoveStyle={onRemoveStyle} disabled={image?false:true} />))
  }

  return (
    <SafeAreaView style={[styles.packageDetailsContainer,{opacity:!loading?1:0.3}]}>
      <Card style={[styles.customerInformation,{alignContent:'center'}]}>
      <TouchableOpacity
                style={{padding: 13,left:"70%"}}
                onPress={() => setModalVisible(true)}>
                  <View style={{flexDirection:"row"}}>
                  <Text style={{fontSize:20,top:-30}}>Trợ giúp </Text>
                </View>
              </TouchableOpacity>
      
        
     {loading && ( <ActivityIndicator size="large" color="#0000ff" style={{position:'absolute',alignSelf:'center',top:"50%"}} />)}
        <View style={{width:200,height:200,alignSelf:'center',marginTop:0}}>
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
          <ScrollView style={{ position: 'absolute', bottom: -10, }} horizontal={true}
            showsHorizontalScrollIndicator={false}>
              <DataLoader entity={ENTITY.STYLE} jwt={jwt} renderData={renderStyle} getAll navigation={navigation}/> 
          </ScrollView>
        </View>
      </Card>
      <Card style={stylesA.packageDetailsFooter}>
        <TouchableOpacity onPress={onTryPress} style={styles.packageDetailsBookingButton}>
          <Text style={{color:"#FFF",fontWeight:"bold",fontSize:20}}>Thử ngay</Text>
        </TouchableOpacity>
        
      </Card>

      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        transparent={true}
      >
        <View style={stylesA.centeredView}>
          <View style={stylesA.modalView}>
            <Text style={stylesA.modalText}>1: Hãy chọn một bức ảnh đẹp của bạn, ảnh đẹp là khi thấy được đầy đủ khuôn mặt của bạn.</Text>
            <Text style={stylesA.modalText}>2: Chúng ta chỉ có thể xem được diện mạo của mình khi không bị che khuất. Vui lòng không mang khẩu trang.</Text>
            <Text style={stylesA.modalText}>3: Vui lòng sử dụng ứng dụng trên khuôn mặt của con người.</Text>
            <Text style={stylesA.modalText}>4: Trong trường hợp không chọn được style, ứng dụng sẽ chọn ngẫu nhiên 3 style cho bạn.</Text>
            <Pressable
              style={[stylesA.button, stylesA.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={stylesA.textStyle}>Đóng</Text>
            </Pressable>
          </View>
        </View>

      </Modal>
      <Modal
        visible={modalValidVisible}
        onRequestClose={() => {
          setModalValidVisible(!modalValidVisible);
        }}
        transparent={true}
      >
        <View style={stylesA.centeredView}>
          <View style={stylesA.modalView}>
            <Text style={stylesA.modalText}>Bạn chưa chọn ảnh.</Text>
            <Pressable
              style={[stylesA.button, stylesA.buttonClose]}
              onPress={() => setModalValidVisible(!modalValidVisible)}
            >
              <Text style={stylesA.textStyle}>Đóng</Text>
            </Pressable>
          </View>
        </View>

      </Modal>
      <Modal
        visible={errorModal}
        onRequestClose={() => {
          setErrorModal(!errorModal);
        }}
        transparent={true}
      >
        <View style={stylesA.centeredView}>
          <View style={stylesA.modalView}>
            <Text style={stylesA.modalText}>Ảnh lỗi, vui lòng thử lại.</Text>
            <Pressable
              style={[stylesA.button, stylesA.buttonClose]}
              onPress={() => setErrorModal(!errorModal)}
            >
              <Text style={stylesA.textStyle}>Đóng</Text>
            </Pressable>
          </View>
        </View>

      </Modal>
      
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
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
    elevation: 5
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
    textAlign: "center",
    fontSize:16
  },
  packageDetailsFooter:{
    backgroundColor:"#448AF4",
    justifyContent: 'center',
    flex: 1,
  }
});


export default PreviewMakeupScreen;