import React,{useState,useEffect} from "react";
import { View, Text } from "react-native";
import BookingHistory from "../components/BookingHistory";
import DataLoader from "../model/Dataloader";
import { ENTITY } from "../utils/Constants";
import { SafeAreaView, ScrollView } from 'react-native';
import { useStyle } from '../utils/style';
import { next } from "../utils/Count";


export const BookingHistoryScreen = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const { jwt, user } = params;
  const styles = useStyle();
  const [loading,setLoading] = useState(0);


  const renderBookingHistory = (data) => {
    // console.log(data);
    return data.map((booking) => <BookingHistory key={booking.id} booking={booking} navigation={navigation}/>)
  }

  return (
    <SafeAreaView style={styles.listItem}>
      <ScrollView>
      <DataLoader key={next()} entity={ENTITY.BOOKING} jwt={jwt} renderData={renderBookingHistory} additionalParams={{ customerId: user.id }} getAll navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  )
}