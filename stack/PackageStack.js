import { createStackNavigator } from "@react-navigation/stack";
import ChooseShowroomScreen from "../screens/ChooseShowroomScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import Payment from "../screens/Payment";
import PreviewMakeupScreen from "../screens/PreviewMakeupScreen";
import SuccessScreen from "../screens/SuccessScreen";
import PackageDetailsScreen from "../screens/PackageDetailsScreen";
import PackagesScreen from "../screens/PackagesScreen";
import PreviewResultScreen from "../screens/PreviewResultScreen";

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
        name="ChooseShowroom"
        options={{
          title: "Đặt lịch",
        }}
        component={ChooseShowroomScreen}
        {...props}
        initialParams={{ user: user, jwt: jwt }}
      />
      <Navigation.Screen
        name="Confirmation"
        options={{
          title: "Đặt lịch",
        }}
        component={ConfirmationScreen}
        {...props}
        initialParams={{ user: user, jwt: jwt }}
      />
      <Navigation.Screen
        name="Payment"
        options={{
          title: "Đặt lịch",
        }}
        component={Payment}
        {...props}
        initialParams={{ user: user, jwt: jwt }}
      />
      <Navigation.Screen
        name="PreviewMakeup"
        options={{
          title: "Trang điểm thử",
        }}
        component={PreviewMakeupScreen}
        {...props}
        initialParams={{ user: user, jwt: jwt }}
      />
      <Navigation.Screen
        name="SuccessScreen"
        options={{
          title: "Đặt lịch",
          headerLeft: null,
        }}
        component={SuccessScreen}
        {...props}
        initialParams={{ user: user, jwt: jwt }}
      />
      <Navigation.Screen
        name="ResultScreen"
        options={{
          title: "Kết quả trang điểm thử",
          headerLeft: null,
        }}
        component={PreviewResultScreen}
        {...props}
        initialParams={{ user: user, jwt: jwt }}
      />
    </Navigation.Navigator>
  )
}