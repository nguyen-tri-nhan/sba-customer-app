import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Modal, StyleSheet } from "react-native";
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import { useStyle } from '../utils/style';
import { toVND } from '../utils/CurrencyHelper';
import Icon from "react-native-dynamic-vector-icons";
import { Pressable, TextInput } from "react-native";
import StarFeedBack from "../components/StartFeedBack";
import StarReview from 'react-native-star-review'
import Services from "../utils/Services";
import { ENTITY, STATUS, STATUS_TRANS } from "../utils/Constants";
import DataLoader from "../model/Dataloader";
import SvgQRCode from 'react-native-qrcode-svg';


export const BookingDetails = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const { booking, jwt } = params
  const styles = useStyle();

  const pkg = booking.package;
  const forwardedItems = booking.items;

  const [modalCancel, setModalCancel] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState('');
  const [star, setStar] = useState();
  const [feedback, setFeedback] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false)
  const [cancel, setCancel] = useState(true);
  const [edit, setEdit] = useState(booking.editable);
  const [showroom, setShowroom] = useState();

  const onSelectedStar = (star) => {
    setStar(star);
  }

  const onFeedBackClick = () => {
    setModalVisible(true);
    setFeedback(true);
  }

  const onShowCancelModal = () => {
    setModalCancel(true);
  };

  const onCancelBooking = () => {
    // add api cancel booking
    setModalCancel(true);
    console.log(booking);
  }

  const onSendFeedback = () => {
    //add api them fb 
    console.log("feedback")
    console.log(star);
    console.log(value);
    Services.feedBack({
      bookingId: booking.id,
      stars: star,
      description: value
    }, jwt);
  }

  const isShowFeedback = () => {
    Services.search(ENTITY.FEEDBACK, { bookingId: booking.id }, jwt)
      .then(({ data }) => {
        if (data.content && data.content[0]) {
          setFeedback(true);
          setStar(data.content[0].stars)
        }
        setShowFeedback(booking.status == STATUS.FINISH && !data.content[0]);
      })
  }

  const isCancelButtonRendered = () => {
    return cancel && booking.status === STATUS.PENDING;
  }

  const getShowroom = () => {
    Services.search(`${ENTITY.SHOWROOM}/${booking.showroomId}`, null, jwt)
      .then(({ data }) => {
        setShowroom(data)
      })
  }

  useEffect(() => {
    isShowFeedback();
    getShowroom();
    navigation.addListener('focus', () => {
      isShowFeedback();
    });
  }, [])

  const [data,setData] = useState()

  const renderStyleTracking = (data) => {
    setData(data);
    // return (
    //   <View>
        
    //   </View>
    // )
  }
  const onPressViewStyleTracking = ()=>{
    navigation.push("BookingStyle", { data })
  }

  const onEditPress = () => {
    navigation.push("EditBooking", { booking, jwt })
  }

  const booking_id = booking.id + "";

  return (
    <SafeAreaView style={styles.packageDetailsContainer}>
      <Card key={'2'} style={[styles.packageDetailsTitleCard, { marginBottom: 0 }]}>
        <ScrollView>
          <View style={styleA.conText}>
            <Title style={[styles.packageDetailsTitle, styleA.titlePkg]}>{pkg.name}</Title>
            <Title style={styles.packageDetailsPrice}>Tổng tiền: {toVND(booking.totalPrice)}</Title>
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
                name="calendar"
                type="AntDesign"
                size={30}
              />
              <Text style={styleA.textIcon}>Ngày chụp: {booking.departureDate}</Text>
            </View>
            <View style={styleA.conRow}>
              <Icon
                name="calendar"
                type="AntDesign"
                size={30}
              />
              <Text style={styleA.textIcon}>Ngày nhận ảnh: {booking.departureDate}</Text>
            </View>
            {booking.adviceDate && (<View style={styleA.conRow}>
              <Icon
                name="back-in-time"
                type="Entypo"
                size={30}
              />
              <Text style={styleA.textIcon}>Ngày thử đồ: {booking.adviceDate.split('T')[0]}</Text>
            </View>)}
            <View style={styleA.conRow}>
              <Icon
                name="description"
                type="MaterialIcons"
                size={30}
              />
              <Text style={styleA.textIcon}>Mô tả:</Text>
            </View>

            <Paragraph>{pkg.description}</Paragraph>
            <View style={[styleA.conRow, { marginTop: 10 }]}>
              <Icon
                name="payment"
                type="MaterialIcons"
                size={30}
              />
              <Text style={styleA.textIcon}>Đã cọc: {toVND(booking.price)} </Text>
            </View>
            
            
            <TouchableOpacity onPress={onPressViewStyleTracking}>
              <View style={[styleA.btnRiew]} >
                  <Text style={styleA.statusText}>Xem lại ảnh trang điểm</Text>
              </View>
              <DataLoader
                    entity={ENTITY.STYLE_TRACKING}
                    additionalParams={{ bookingId: booking.id }}
                    jwt={jwt}
                    getAll
                    navigation={navigation}
                    renderData={renderStyleTracking}
              />
            </TouchableOpacity>


            {forwardedItems.length>0?(
            <View style={{flexDirection:"column",justifyContent:"space-around"}}>
              
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
              </View>):<></>}
              {
                  forwardedItems.map((item) =>
                  (<View key={item.id} style={[styleA.conText,{flexDirection:"row",justifyContent:'space-between',marginRight:30}]}>
                      <Text style={[styleA.text,{marginBottom:10}]}>{item.itemName} : x{item.amount} cái  </Text>
                      <Text style={[styleA.text,{marginBottom:10}]}>{toVND(item.price * item.amount)}</Text>
                  </View>
                  ))
                }
            <View style={styleA.divineLine} />
            {/* qr code */}
            <View style={styleA.conQR}>
              <SvgQRCode value={booking_id} size={200} />
            </View>
            <View style={styleA.divineLine} />
            <View style={[styleA.conRow, { marginTop: 20 }]}>
              <Icon
                name="statusnet"
                type="Zocial"
                size={30}
              />
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                <Text style={styleA.textIcon}>Trạng thái:</Text>
                <View style={[styleA.status, { backgroundColor: booking.status == STATUS.CANCELED ? "#E14C4C" : booking.status == STATUS.FINISH ? "#1CC286" : "#2D71D7" }]} >
                  <Text style={styleA.statusText}>{STATUS_TRANS[booking.status]}</Text>
                </View>
              </View>
            </View>


            {(feedback) && (
              <View style={[styleA.conRow, { marginTop: 20 }]}>
                <Icon
                  name="feedback"
                  type="MaterialIcons"
                  size={30}
                />

                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={[styleA.textIcon, { marginRight: 20, top: 5 }]}>Đánh giá:</Text>
                  <StarReview
                    ratings={star}
                    stars={5}
                    starColor="#FFDF6F"
                    reviews={star}
                    reviewsText=""
                    starSize={30}
                  />
                </View>
              </View>
            )}

          </View>
        </ScrollView>
      </Card>
      {(isCancelButtonRendered() || edit || (showFeedback && !feedback)) &&
        <Card style={styleA.footerCard}>
          <View style={styleA.conRowBtn}>
            {isCancelButtonRendered() && (<TouchableOpacity onPress={onShowCancelModal}>
              <View style={[styleA.conBtn, { backgroundColor: "#E14C4C" }]}>
                <Text style={[styleA.conTextBtn,{top:3}]}>Hủy bỏ</Text>
              </View>
            </TouchableOpacity>)}

            {edit && (<TouchableOpacity onPress={onEditPress}>
              <View style={[styleA.conBtn, { backgroundColor: "#2D71D7" }]}>
                <Text style={[styleA.conTextBtn,{top:3}]}>Chỉnh sửa</Text>
              </View>
            </TouchableOpacity>)}
            {showFeedback && !feedback && (
              <TouchableOpacity onPress={onFeedBackClick}>
                <View style={[styleA.conBtn, { height: 40 }]}>
                  <Text style={[styleA.conTextBtn, { top: 8 }]}>Đánh giá</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </Card>
      }
      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        transparent={true}
      >
        <View style={styleA.centeredView}>
          <View style={styleA.modalView}>
            <Text style={styleA.modalTitle}>Góp ý</Text>
            <StarFeedBack onSelectedStar={onSelectedStar} star={star} />
            <TextInput editable
              multiline
              numberOfLines={4}
              onChangeText={text => setValue(text)}
              value={value}
              style={{ padding: 10, borderWidth: 0.4, width: 100, height: 40, marginBottom: 20 }} />
            <Pressable
              style={[styleA.button, styleA.buttonClose]}
              onPress={() => { setModalVisible(!modalVisible); onSendFeedback(); }}
            >
              <Text style={styleA.textStyle}>Đóng</Text>
            </Pressable>
          </View>
        </View>

      </Modal>

      <Modal
        visible={modalCancel}
        onRequestClose={() => {
          setModalCancel(!modalCancel);
        }}
        transparent={true}
      >
        <View style={styleA.centeredView}>
          <View style={styleA.modalView}>
            <Text style={styleA.modalTitle}>Bạn sẽ mất tiền cọc khi hủy lịch chụp. Tiếp tục ?</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-around" }} >
              <Pressable
                style={[styleA.button, styleA.buttonClose, { backgroundColor: "#E14C4C" }]}
                onPress={() => { onCancelBooking() }}
              >
                <Text style={styleA.textStyle}>Đồng ý</Text>
              </Pressable>

              <Pressable
                style={[styleA.button, styleA.buttonClose, { backgroundColor: "#fff" }]}
                onPress={() => { setModalCancel(!modalCancel) }}
              >
                <Text style={[styleA.textStyle, { color: "#000" }]}>Hủy bỏ</Text>
              </Pressable>
            </View>
          </View>
        </View>

      </Modal>
    </SafeAreaView >
  )
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
  },

  text: {
    color: '#000',
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  status: {
    borderRadius: 20,
    width: 150,
    alignItems: 'center',
    left: 100,
    alignSelf: "flex-end",
    height: 30,
    position: "absolute"
  },
  
  btnRiew: {
    borderRadius: 20,
    width: 150,
    alignItems: 'center',
    alignSelf: "center",
    height: 30,
    backgroundColor:"#2D71D7",
    width:"80%"
  },
  statusText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 15,
    top: 4
  },
  footerCard: {
    flex: 1,
  },
  conRowBtn: {
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: 20,

  },
  conBtn: {
    borderRadius: 10,
    backgroundColor: "#2D71D7",
    width: 150,
    height: "80%",
    alignSelf: 'center',
    alignItems: 'center'
  },
  conTextBtn: {
    fontWeight: 'bold',
    fontSize: 20,
    color: "#fff",
    top: 15
  }
  , centeredView: {
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

    width: "80%"
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
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  conQR: {
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
  }

})

export default BookingDetails;