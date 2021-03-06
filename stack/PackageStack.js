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
  const { jwt, user, depositsPercentage } = props.route.params;
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
          title: "Chọn showroom",
        }}
        component={ChooseShowroomScreen}
        {...props}
        initialParams={{ user: user, jwt: jwt }}
      />
      <Navigation.Screen
        name="Confirmation"
        options={{
          title: "Chọn ngày",
        }}
        component={ConfirmationScreen}
        {...props}
        initialParams={{ user: user, jwt: jwt }}
      />
      <Navigation.Screen
        name="Payment"
        options={{
          title: "Thanh toán",
        }}
        component={Payment}
        {...props}
        initialParams={{ user: user, jwt: jwt, depositsPercentage: depositsPercentage }}
      />
      <Navigation.Screen
        name="PreviewMakeup"
        options={{
          title: "Trang điểm thử",
          headerLeft: null,
        }}
        component={PreviewMakeupScreen}
        {...props}
        initialParams={{ user: user, jwt: jwt }}
      />
      <Navigation.Screen
        name="SuccessScreen"
        options={{
          title: "Thành công",
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
        }}
        component={PreviewResultScreen}
        {...props}
        initialParams={{ user: user, jwt: jwt }}
      />
    </Navigation.Navigator>
  )
}