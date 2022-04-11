import React, { useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, ScrollView, View, StyleSheet, Modal, Pressable } from 'react-native';
import BookingStepIndicator from '../components/BookingStepIndicator';
import { Text } from '../components/Themed';
import { Button, Card } from 'react-native-paper';
import { useStyle } from '../utils/style';
import { toVND } from '../utils/CurrencyHelper';
import DatePicker from '../components/DatePicker';
import TimePicker from '../components/TimePicker';
import Services from '../utils/Services';
import { ENTITY } from '../utils/Constants';
import { ago } from '../utils/DateHelper';
import Icon from "react-native-dynamic-vector-icons";
import { before } from 'lodash';
import Checkbox from 'expo-checkbox';

function ConfirmationScreen(props) {
  const { navigation, route } = props;
  const { params } = route;
  const { pkg, jwt, user, forwardedItems, totalPrice, showroom } = params;
  const [dressDate, setDressDate] = useState();
  const [startDate, setStartDate] = useState();
  const [getDate, setGetDate] = useState();
  const [unavailablePhotoSlots, setUnavailablePhotoSlots] = useState();
  const [unavailableDressSlots, setUnavailableDressSlots] = useState();
  const [availableDressSlot,setAvailableDressSlot] = useState();

  const [modalVisible, setModalVisible] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [slot, setSlot] = useState('');
  const [isMorning, setMorning] = useState(false);
  const [isAfternoon, setAfternoon] = useState(false);
  
  const [isMorningBtn, setMorningBtn] = useState(false);
  const [isAfternoonBtn, setAfternoonBtn] = useState(false);
  
  const handleChooseSlotMorning=  () => {
     setSlot('T07:00:00');
    setMorningBtn(!isMorningBtn);
    setAfternoonBtn(false);
    if(!isMorningBtn)
      handleChooseSlot();
    console.log(dressDate);
  }
  const handleChooseSlotAfternoon= () => {
    setSlot('T14:00:00');
    setAfternoonBtn(!isAfternoonBtn);
    setMorningBtn(false);
    if(!isAfternoonBtn)
      handleChooseSlot();
    // console.log(dressDate);
  }

  const handleChooseSlot = () => {
    // console.log('slot ',slot);
    
  
    // if(slot == 'Morning'){
    //   setDressDate(dressDate.split('T')[0] +'T07:00:00')
    // }else if (slot == 'Afternoon'){
    //   setDressDate(dressDate.split('T')[0] +'T14:00:00')
    // }
  }

  const onCheckDressSlot = (date) => {
    setDressDate(date);
    setMorning(false);
    setAfternoon(false);
    setMorningBtn(false);
    setAfternoonBtn(false);
    setSlot('');
    // console.log(availableDressSlot);
    if (date && availableDressSlot){
      let slotAvailable = availableDressSlot.filter((obj) => {if (obj.date.split('T')[0] == date) return obj;});
      
      slotAvailable.forEach(element => {
        let data = element.date.split('T');
        if(data[1] == "07:00:00") {
          setMorning(true);
        };
        if(data[1] == "14:00:00") {
          setAfternoon(true);
        }
      });
    }
  }



  const styles = useStyle();
  const onContinuePress = () => {
    console.log(isChecked,dressDate,slot);
    if (startDate && getDate && ((isChecked && dressDate && slot != '') || !isChecked)){
    navigation.push("Payment", { pkg, forwardedItems, totalPrice, showroom, dressDate, startDate, getDate,slot });
    }else{
      setModalVisible(true)
    }
  }

  const getUnavailablePhotoSlot = () => {
    Services.search(ENTITY.SLOT_PHOTO, { showroomId: showroom.id }, jwt)
    .then(({ data }) => {
      const { content } = data;
      if (content) {
        const unavailableObj = content.filter((slot) => slot.availableSlot < 1);
        if (unavailableObj.length > 0) {
          const unavailableDates = unavailableObj.map((slot) => new Date(slot.date));
          setUnavailablePhotoSlots(unavailableDates);
        }
      }
    });
  }

  const getUnavailableDressSlot = () => {
    Services.search(ENTITY.SLOT_DRESS, { showroomId: showroom.id }, jwt)
    .then(({ data }) => {
      const { content } = data;
      if (content) {
        let unavailableObj = content.filter((slot) => slot.availableSlot < 1);
        const availableObj = content.filter((slot) => slot.availableSlot > 0);
        setAvailableDressSlot(availableObj);
        if (unavailableObj.length > 0) {
          unavailableObj.forEach((ele1) => {
            content.forEach((ele2) => {

              if (ele1.date.split('T')[0] == ele2.date.split('T')[0]){
                let idx = unavailableObj.indexOf(ele1);
                unavailableObj = unavailableObj.splice(idx,1); 
              }
            });
          });
          
          const unavailableDates = unavailableObj.map((slot) => new Date(slot.date));
          setUnavailableDressSlots(unavailableDates);
        }
      }
    });
  }

  const onChecked = () => {
    setChecked(!isChecked);
    setDressDate();
    // console.log(dressDate)
  }

  useEffect(() => {
    getUnavailablePhotoSlot();
    getUnavailableDressSlot();
  }, [])

  return (
    <SafeAreaView style={styles.packageDetailsContainer}>
      <BookingStepIndicator currentStep={1} />
      <Card style={[styles.customerInformation, { marginBottom: 7, paddingBottom: 10 }]}>
        <ScrollView>
          <View style={styleA.container}>
            <Text style={styleA.h1}>
              XÁC NHẬN
            </Text >
            <View
              style={{
                borderBottomColor: '#000',
                borderBottomWidth: 1,
                width: "80%",
                alignSelf: "center",
                marginBottom: 20,
              }}
            />
            <Text style={styleA.h2}>
              Gói dịch vụ: {pkg.name}
            </Text>
            <View style={styleA.conRow}>
            <Icon
              name="location"
              type="Entypo"
              size={30}
            />
            <Text style={[styleA.h3,styleA.textIcon]}>
              Địa điểm chụp: {pkg.location}
            </Text>
            </View>
            <View style={styleA.conRow}>
            <Icon
              name="add-a-photo"
              type="MaterialIcons"
              size={30}
            />
            <Text style={[styleA.h3,styleA.textIcon]}>
              Chi nhánh thực hiện: {showroom.name}
            </Text>
            </View>
            <View style={styleA.conRow}>
            <Icon
              name="location"
              type="Entypo"
              size={30}
            />
            <Text style={[styleA.h3,styleA.textIcon]}>
              Địa chỉ: {showroom.address}
            </Text>
            </View>
            
            {
              forwardedItems.length>0?(
              <View style={styleA.conRow}>
              <Icon
                name="add-to-list"
                type="Entypo"
                size={30}
              />
                <Text style={[styleA.h3,styleA.textIcon]}>
                  Dịch vụ thêm:
                </Text>
              </View>):<></>
            }
            {
              forwardedItems.map((item) =>
              (<View key={item.id}>
                <Text style={styleA.h3}>{item.itemName} : {item.amount} cái</Text>
              </View>))
            }
            <View style={styleA.conDate}>
            <View style={styleA.conRow}>
            <Icon
              name="calendar"
              type="AntDesign"
              size={30}
            />
            <Text style={{marginLeft:10,top:5,fontSize:15}}>
              Ngày chụp :
            </Text>
            </View>
              <DatePicker onConfirm={setStartDate} validRange={{ startDate: ago(3), disabledDates: unavailablePhotoSlots }}/>
            </View>
            <View style={styleA.conDate}>
            <View style={styleA.conRow}>
            <Icon
              name="calendar"
              type="AntDesign"
              size={30}
            />
            <Text style={{marginLeft:10,top:5,fontSize:15}}>
              Ngày nhận:
            </Text>
            </View>
              <DatePicker onConfirm={setGetDate} disabled={!startDate} validRange={{ startDate: ago(3, startDate) }}/>
            </View>
            <View style={[styleA.conRow,{marginTop:10}]}>
              <Checkbox
                style={styleA.checkbox}
                value={isChecked}
                onValueChange={onChecked}
                color={isChecked ? '#4630EB' : undefined}
              />

              <Text style={{bottom:-5}}>Bạn muốn lên thử áo quần trước khi chụp ?</Text>
            </View>
            {isChecked?
            (<View style={styleA.conDate} disabled={isChecked}>
              <View style={styleA.conRow}>
                <Icon
                  name="calendar"
                  type="AntDesign"
                  size={30}
                />
                <Text style={{marginLeft:10,top:5,fontSize:15}}>
                  Ngày thử :
                </Text>
              </View>
              <View style={styleA.conText}>
                <DatePicker onConfirm={onCheckDressSlot} disabled={!startDate || !isChecked} 
                  validRange={{ startDate: ago(1), endDate: ago(-1, startDate), disabledDates:unavailableDressSlots}}/>
              </View>
            </View>
            ):<></>}
          {(dressDate && isChecked )?
            (<View style={[styleA.conRow,{justifyContent:'space-around'}]}>
            <TouchableOpacity disabled={!isMorning} onPress={handleChooseSlotMorning}>
              <View style={[styleA.btnSlot,{backgroundColor:isMorningBtn?"#2D71D7":"#A4A6A8"}]}><Text style={styleA.slotText}>Sáng</Text></View>
            </TouchableOpacity>
            <TouchableOpacity disabled={!isAfternoon} onPress={handleChooseSlotAfternoon}>
              <View style={[styleA.btnSlot,{backgroundColor:isAfternoonBtn?"#2D71D7":"#A4A6A8"}]}><Text style={styleA.slotText}>Chiều</Text></View>
            </TouchableOpacity>
          </View>
          ):<></>}
            
          </View>
        </ScrollView>
      </Card>
      <Card style={styles.packageDetailsFooter}>
        <TouchableOpacity onPress={onContinuePress} style={styles.packageDetailsBookingButton}>
          <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 20 }}>Thanh toán: {toVND(totalPrice)}</Text>
        </TouchableOpacity>
      </Card>
      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        transparent={true}
      >
        <View style={styleA.centeredView}>
          <View style={styleA.modalView}>
            <Text style={styleA.modalText}>Bạn chưa chọn xong ngày.</Text>
            <Pressable
              style={[styleA.button, styleA.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styleA.textStyle}>Đóng</Text>
            </Pressable>
          </View>
        </View>

      </Modal>
    </SafeAreaView>
  );
}

const styleA = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30
  },
  h1: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 30,
    alignSelf: 'center',
    color: '#FB6F6F'
  },
  h2: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 15,
  },
  h3: {

    fontSize: 15,
    marginBottom: 15,
  },
  conDate: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop: 20
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
    width: 80
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
  conRow:{
    flexDirection:"row",
    marginBottom:15
  },
  textIcon:{
    top:10,
    marginLeft:20,
  },
  checkbox: {
    alignSelf: "center",
    marginHorizontal:30,
    width:30,
    height:30
  },
  btnSlot:{
    borderRadius:20,
    width:100,
    height:30,
    alignItems:'center',
  },
  slotText:{
    top:5,
    fontSize:16,
    fontWeight:'bold',
    color:'#fff'
  }
})

export default ConfirmationScreen;