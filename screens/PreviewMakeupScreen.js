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
      quality: 1,
    });
    result.then((response) => {
      if (!response.cancelled) {
        setImage(response.uri);
      }
    })
  };

  const onTryPress = () => {
    Services.previewMakeup(fs.createReadStream(image)).then(({links}) => {
      navigation.push('ResultScreen', { links: links })
    })
  }

  return (
    <SafeAreaView style={styles.packageDetailsContainer}>
      <Card style={styles.customerInformation}>
        <Image source={image ? { uri: image } : require("../assets/style_14.jpg")}
          style={{ flex: 1, width: 200, height: 50, alignSelf: 'center', marginTop: 10, resizeMethod: 'resize', resizeMode: 'contain' }}>
        </Image>

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