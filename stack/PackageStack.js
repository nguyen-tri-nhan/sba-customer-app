import { createStackNavigator } from "@react-navigation/stack";
import BookingScreen from "../screens/BookingScreen";
import BookingScreen2 from "../screens/BookingScreen2";
import BookingScreen3 from "../screens/BookingScreen3";
import BookingScreen4 from "../screens/BookingScreen4";
import BookingScreen5 from "../screens/BookingScreen5";
import PackageDetailsScreen from "../screens/PackageDetailsScreen";
import PackagesScreen from "../screens/PackagesScreen";

const Navigation = createStackNavigator();

export const PackagesStack = (props) => {
  const { jwt, user } = props.route.params;
  return (
    <Navigation.Navigator>
      <Navigation.Screen
        name="Packages"
        options={{
          title: "Dịch vụ",
        }}
        component={PackagesScreen}
        {...props}
        initialParams={{ user: user, jwt: jwt }}
      />
      <Navigation.Screen
        name="PackagesDetails"
        options={{
          title: "Chi tiết",
        }}
        component={PackageDetailsScreen}
        {...props}
        initialParams={{ user: user, jwt: jwt }}
      />
      <Navigation.Screen
        name="Booking"
        options={{
          title: "Đặt lịch",
        }}
        component={BookingScreen}
        {...props}
        initialParams={{ user: user, jwt: jwt }}
      />
      <Navigation.Screen
        name="Booking2"
        options={{
          title: "Đặt lịch",
        }}
        component={BookingScreen2}
        {...props}
        initialParams={{ user: user, jwt: jwt }}
      />
      <Navigation.Screen
        name="Booking3"
        options={{
          title: "Đặt lịch",
        }}
        component={BookingScreen3}
        {...props}
        initialParams={{ user: user, jwt: jwt }}
      />
      <Navigation.Screen
        name="Booking4"
        options={{
          title: "Đặt lịch",
        }}
        component={BookingScreen4}
        {...props}
        initialParams={{ user: user, jwt: jwt }}
      />
      <Navigation.Screen
        name="Booking5"
        options={{
          title: "Đặt lịch",
        }}
        component={BookingScreen5}
        {...props}
        initialParams={{ user: user, jwt: jwt }}
      />
    </Navigation.Navigator>
  )
}