import { isEmpty, unionBy } from 'lodash';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, ScrollView, Text,Modal,StyleSheet ,View,Pressable} from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import AdditionalItem from '../components/AdditionalItem';
import DataLoader from '../model/Dataloader';
import { ENTITY, STATUS } from '../utils/Constants';
import { toVND } from '../utils/CurrencyHelper';
import { useStyle } from '../utils/style';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from "react-native-dynamic-vector-icons";

function PackageDetailsScreen(props) {

  const styles = useStyle();

  const { navigation, route } = props;
  const { params } = route;
  const { pkg, jwt } = params;

  const [additionalItems, setAdditionalItems] = useState([]);

  const getImagesList = (imgs) => {
    if (imgs) {
      return imgs.map((item) => item.imageUrl);
    }
    return;
  }

  const getImagesViewList = (imgs) => {
    if (imgs) {
      let images = []
      imgs.forEach(item => {
        let obj = {}
        obj["url"]=item.imageUrl;
        obj["props"]={};
        images.push(obj)
      });
      return images
    }
    return;
  }

  const images = getImagesList(pkg.images);

  const onBookingPress = () => {
    navigation.push("ChooseShowroom", { pkg: pkg, additionalItems: additionalItems, totalPrice: countTotalPrice() });
  }

  const onAmountChange = (item, amount) => {
    item.amount = amount;
    const res = unionBy([item], additionalItems, 'id');
    setAdditionalItems(res);
  }

  const renderAdditionalItem = (data) => {
    if (isEmpty(data)) {
      return;
    }
    setAdditionalItems(data);
    return data.map((item) => (<AdditionalItem onAmountChange={onAmountChange} key={item.id} item={item} />))
  }

  const countTotalPrice = () => {
    let total = 0;
    total += pkg.price;
    additionalItems.forEach((item) => {
      if (item.amount) {
        total += item.amount * item.price;
      }
    })
    return total;
  }

  
  const [modalVisible, setModalVisible] = useState(false);

  const imagesA = getImagesViewList(pkg.images);

  return (

    <SafeAreaView style={styles.packageDetailsContainer}>
      
      <Card key={'1'} style={styles.imageSliderCard}>
      <SliderBox key={pkg.id} images={images} />
      
      </Card>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ImageViewer imageUrls={imagesA} enableSwipeDown="true" 
        
        onCancel={() => setModalVisible(!modalVisible)}
        />
      </Modal>
      
      <Card key={'2'} style={styles.packageDetailsTitleCard}>
        <ScrollView>
          <View style={styleA.conText}>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => {setModalVisible(true)}}
          >
          <Title style={[styles.packageDetailsTitle,styleA.titlePkg]}>{pkg.name}</Title>
        </Pressable>
          <Title style={styles.packageDetailsPrice}>Giá: {toVND(pkg.price)}</Title>
          <View style={styleA.conRow}>
          <Icon
            name="calendar"
            type="AntDesign"
            size={30}
          />
          <Text style={styleA.textIcon}>Thời gian thực hiện: {pkg.duration} ngày</Text>
          </View>
          <View style={styleA.conRow}>
          <Icon
            name="location"
            type="Entypo"
            size={30}
          />
          <Text style={styleA.textIcon}>Địa điểm: {pkg.location}</Text>
          </View>
          <View style={styleA.conRow}>
          <Icon
            name="description"
            type="MaterialIcons"
            size={30}
          />
          <Text style={styleA.textIcon}>Mô tả:</Text>
          </View>
          
          <Paragraph>{pkg.description}</Paragraph>
          <View style={styleA.divineLine} />
          <View style={styleA.conRow}>
          <Icon
            name="add-to-list"
            type="Entypo"
            size={30}
            style={{top:5}}
          />
          <Text style={[styleA.addition,styleA.textIcon]}>Dịch vụ thêm: </Text>
          </View>
          <DataLoader key={'1'} jwt={jwt} entity={ENTITY.ADDITIONAL_ITEM} renderData={renderAdditionalItem} getAll initialStatus={STATUS.ENABLE} navigation={navigation}/>
          </View>
        </ScrollView>
      </Card>
      <Card style={styles.packageDetailsFooter}>
        <TouchableOpacity onPress={onBookingPress} style={styles.packageDetailsBookingButton}>
          
        <Text style={{color:"#FFF",fontWeight:"bold",fontSize:20}}>Đặt ngay: {toVND(countTotalPrice())}</Text>
        </TouchableOpacity>
      </Card>
    </SafeAreaView>
  );
}

const styleA = StyleSheet.create({
  conText:{
    marginLeft:20
  },
  divineLine: {
    width: "90%",
    height: 1,
    opacity: 0.5,
    backgroundColor: "#4A4A4A",
    alignSelf:"center",
    marginTop:30,
    marginLeft:-15
  },
  titlePkg:{
    marginTop:20,
    color:'#FB6F6F'
  },
  addition:{
    // marginTop:20,
    fontWeight:'bold',
    fontSize:15,
  },
  conRow:{
    flexDirection:"row",
    marginBottom:15
  },
  textIcon:{
    top:10,
    marginLeft:20,
  }
})

export default PackageDetailsScreen;