import { createStackNavigator } from "@react-navigation/stack";
import { BookingDetails } from "../screens/BookingDetails";
import { BookingHistoryScreen } from "../screens/BookingHistoryScreen";


const Navigation = createStackNavigator();

export const HistoryStack = (props) => {

  const { jwt, user } = props.route.params;

  return (
    <Navigation.Navigator>
      <Navigation.Screen
        name="History"
        options={{
          title: "Lịch sử",
        }}
        component={BookingHistoryScreen}
        {...props}
        initialParams={{ user: user, jwt: jwt }}
      />
      <Navigation.Screen
        name="BookingDetails"
        options={{
          title: "Chi tiết",
        }}
        component={BookingDetails}
        {...props}
        initialParams={{ user: user, jwt: jwt }}
      />
    </Navigation.Navigator>
  );
}