import { createStackNavigator } from "@react-navigation/stack";
import { BookingDetails } from "../screens/BookingDetails";
import { BookingHistoryScreen } from "../screens/BookingHistoryScreen";
import EditBooking from "../screens/EditBooking";
import BookingStyleScreen from "../screens/BookingStyleScreen";
import PaymentEdit from "../screens/PaymentEdit";


const Navigation = createStackNavigator();

export const HistoryStack = (props) => {

  const { jwt, user } = props.route.params;

  return (
    <Navigation.Navigator>
      <Navigation.Screen
        name="History"
        options={{
          title: "Lịch sử giao dịch",
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
      
      <Navigation.Screen
        name="EditBooking"
        options={{
          title: "Thêm dịch vụ",
        }}
        component={EditBooking}
        {...props}
        initialParams={{ user: user, jwt: jwt }}
      />

      <Navigation.Screen
        name="BookingStyle"
        options={{
          title: "Xem lại ảnh",
        }}
        component={BookingStyleScreen}
        {...props}
        initialParams={{ user: user, jwt: jwt }}
      />

      <Navigation.Screen
        name="PaymentEdit"
        options={{
          title: "Thanh toán",
        }}
        component={PaymentEdit}
        {...props}
        initialParams={{ user: user, jwt: jwt }}
      />
    </Navigation.Navigator>
  );
}