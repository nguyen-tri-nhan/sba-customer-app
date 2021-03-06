import { isEmpty, unionBy } from 'lodash';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, ScrollView, Text, Modal, StyleSheet, View, Pressable } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import AdditionalItem from '../components/AdditionalItem';
import DataLoader from '../model/Dataloader';
import { ENTITY, STATUS } from '../utils/Constants';
import { toVND } from '../utils/CurrencyHelper';
import { useStyle } from '../utils/style';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from "react-native-dynamic-vector-icons";
import Services from '../utils/Services';

function EditBooking(props) {

  const styles = useStyle();

  const { navigation, route } = props;
  const { params } = route;
  const { booking, jwt } = params;
  const pkg = booking.package;

  const [additionalItems, setAdditionalItems] = useState([]);



  useEffect(() => {

  }, [])




  const onEditBookingPress = () => {
    // Services.updateBookingItems(booking.id, { items: additionalItems,paid:10000,transactionId:"aaa",paymentType:"" }, jwt)
    // .then(() => {
    //   // TODO: success message.
    //   // navigation.goBack();
    //   navigation.reset({
    //     index: 0,
    //     routes: [{ name: 'History' }],
    //   });
    // })
    navigation.push("PaymentEdit",{booking:booking,additionalItems:additionalItems,jwt:jwt});
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
    data.forEach((item) => {
      booking.items.forEach((ele) => {
        if (item.id === ele.item && !item.amount && item.amount !== ele.amount) {
          item.amount = ele.amount;
        }
      })
    });
    return data.map((item) => {
      let amount = 0;
      booking.items.forEach((ele) => {
        if (item.id === ele.item ) {
          amount = ele.amount;
        }
      })
      return (<AdditionalItem onAmountChange={onAmountChange} key={item.id} item={item} oldAmount={item.amount} currentBookingAmount={amount} />)})
  }

  const countTotalPrice = () => {
    let total = 0;
    // total += booking.price - booking.paid;
    additionalItems.forEach((item) => {
      if (item.amount) {
        total += item.amount * item.price;
      }
    })
    booking.items.forEach((item) => {
      total -= item.amount * item.price;
    });
    return total;
  }

  const [modalVisible, setModalVisible] = useState(false);



  return (

    <SafeAreaView style={styles.packageDetailsContainer}>
      <Card style={[styles.customerInformation, { marginBottom: 10 }]}>
        <ScrollView>
          <View style={styleA.conText}>
            <Title style={[styles.packageDetailsTitle, styleA.titlePkg]}>{pkg.name}</Title>
            <View style={styleA.divineLine} />
            <View style={styleA.conRow}>
              <Icon
                name="add-to-list"
                type="Entypo"
                size={30}
                style={{ top: 5 }}
              />
              <Text style={[styleA.addition, styleA.textIcon]}>D???ch v??? th??m: </Text>
            </View>
            <DataLoader key={'1'} jwt={jwt} entity={ENTITY.ADDITIONAL_ITEM} renderData={renderAdditionalItem} getAll initialStatus={STATUS.ENABLE} navigation={navigation} />
          </View>
        </ScrollView>
      </Card>
      <Card style={[styles.packageDetailsFooter]}>
        <TouchableOpacity onPress={onEditBookingPress} style={styles.packageDetailsBookingButton}>
          <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 20 }}>Thanh to??n</Text>
        </TouchableOpacity>
      </Card>
    </SafeAreaView>
  );
}

const styleA = StyleSheet.create({
  conText: {
    marginLeft: 20
  },
  divineLine: {
    width: "90%",
    height: 1,
    opacity: 0.5,
    backgroundColor: "#4A4A4A",
    alignSelf: "center",
    marginTop: 30,
    marginLeft: -15
  },
  titlePkg: {
    marginTop: 20,
    color: '#FB6F6F'
  },
  addition: {
    // marginTop:20,
    fontWeight: 'bold',
    fontSize: 15,
  },
  conRow: {
    flexDirection: "row",
    marginBottom: 15
  },
  textIcon: {
    top: 10,
    marginLeft: 20,
  }
})

export default EditBooking;