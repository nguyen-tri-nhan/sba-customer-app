import React from 'react';
import { View, Text,StyleSheet,Image,TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { useStyle } from '../utils/style';
import { toVND } from '../utils/CurrencyHelper';

function BookingHistory({ booking ,navigation}) {
  const pkg = booking.package;
  const styles = useStyle()
  const onBookingPress = () =>{
    navigation.push('BookingDetails', { booking: booking })
  }
  return (
    <Card style={styleA.card}>
    <TouchableOpacity style={styles.packageContainer} onPress={onBookingPress} >
        <View style={styleA.packagesItem}>
          <View style={styleA.containerImg}>
            <Image style={styleA.packageImage} source={{ uri: pkg.images[0].imageUrl }} />
          </View>
          <View style={styles.packageInfomation}>
            <Text style={styles.packageTitle}>{pkg.name}</Text>
            <Text style={styles.packageTextSecondary}>Địa điểm: {pkg.location}</Text>
            
            {/* <View style={styleA.conPrice}> */}
              <View style={{flexDirection:"column"}}>
              <Text style={styleA.textDate}>Ngày chụp: {booking.departureDate}</Text>
              <Text style={styleA.textDate}>Ngày nhận: {booking.returnDate}</Text>
              </View>
              <View style={[styleA.status,{backgroundColor:booking.status=="CANCELED"?"#E14C4C":booking.status=="FINISH"?"#1CC286":"#2D71D7"}]} >
                <Text style={styleA.statusText}>{booking.status}</Text>
              </View>
            {/* </View> */}
          </View>
        </View>
        </TouchableOpacity>
    </Card> 
  );
}
const styleA = StyleSheet.create({
  card: {
    flex: 9,
    backgroundColor: "#FFF",
    marginTop: 40,
    marginLeft: 30,
    marginRight: 10,
    width:"100%",
  },
  textDate:{
    paddingTop: 10,
    textAlign: 'left',
    color:"#000"
  },
  status:{
    borderRadius:20,
    width:"35%",
    alignItems:'center',
    right:-10,
    bottom:15,
    alignSelf:"flex-end",
    height:30,
    position:"absolute"
  },
  statusText:{
    fontWeight:'bold',
    color:'#fff',
    fontSize:13,
    top:8
  },
  text: {
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10,
  },
  box: {
    marginLeft: 25,
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 25,
    marginTop: 10
  },
  boxh1: {

  },
  h1: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    color: '#FB6F6F'
  },
  h2: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  h3: {
    fontSize: 16,
  },

  packagesItem: {
    minWidth: 360,
    width: '80%',
    flex: 1,
    padding: 10,
    // margin: 5,
    // marginRight:10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius:10,
  },
  packageImage: {
    top: -35,
    left: -40,
    position: "absolute",
    width: 125,
    height: 125,
    flex: 3,
    borderRadius: 20,
  },
  containerImg: {
    width: 100,
    height: 100,
    flex: 3,
    borderRadius: 30

  },
  conPrice: {
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  star: {
    paddingTop: 10,
    alignItems: 'flex-start'
  },
  divineLine: {
    width: 1,
    height: 35,
    opacity: 0.5,
    marginLeft: 10,
    backgroundColor: "#4A4A4A"
  }
})
export default BookingHistory;