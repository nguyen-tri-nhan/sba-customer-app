import { View, Text } from "react-native";
import DataLoader from "../model/Dataloader";
import { ENTITY } from "../utils/Constants";


export const BookingHistoryScreen = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const { jwt, user } = params;

  const renderBookingHistory = (data) => {
    console.log(data)
  }

  return (
    <View>
      <DataLoader entity={ENTITY.BOOKING} jwt={jwt} renderData={renderBookingHistory} additionalParams={{ customerId: user.id }} getAll />
    </View>
  )
}