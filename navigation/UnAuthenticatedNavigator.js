// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "react-native";
import Colors from "../constants/Colors";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const BottomTab = createBottomTabNavigator();

export default function UnAuthenticatedNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{ tabBarActiveTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Đăng nhập"
        component={LoginNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="log-in-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Đăng ký"
        component={RegisterNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="person-add-outline" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const LoginStack = createStackNavigator();

function LoginNavigator() {
  return (
    <LoginStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <LoginStack.Screen
        name="LoginScreen"
        component={LoginScreen}
      />
    </LoginStack.Navigator>
  );
}

const RegisterStack = createStackNavigator();

function RegisterNavigator() {
  return (
    <RegisterStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <RegisterStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
      />
    </RegisterStack.Navigator>
  );
}
