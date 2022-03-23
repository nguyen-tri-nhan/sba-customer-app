// If you are not familiar with React Navigation, check out the "Fundamentals" guide:
// https://reactnavigation.org/docs/getting-started
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { isLoggedIn } from "../model/MAuth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LinkingConfiguration from "./LinkingConfiguration";
import { useState, useEffect, useMemo } from "react";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import PersonalScreen from "../screens/PersonalScreen";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../utils/context";
import { isEmpty } from "lodash";
import Services from "../utils/Services";

export default function Navigation({ colorScheme }) {
  const [jwt, setJwt] = useState('');
  const [userDetails, setUserDetails] = useState({});


  const authContext = useMemo(() => {
    return {
      getMe: () => {
        return userDetails;
      },
      login: (user) => {
        Services.login(user)
          .then(({ data }) => {
            setJwt(`Bearer ${data.accessToken}`);
            return `Bearer ${data.accessToken}`;
          })
          .then((jwt) => {
            Services.getMe(jwt)
              .then(({ data }) => {
                setUserDetails(data);
              })
          })
      },
      logout: () => {
        setJwt('');
      },
      getJwt: () => {
        return jwt;
      }
    };
  }, [])

  function TabBarIcon(props) {
    return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
  }

  const UnAuthStack = createStackNavigator();
  const AuthTabs = createBottomTabNavigator();
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        {
          !isEmpty(jwt)
            ?
            <AuthTabs.Navigator>
              <AuthTabs.Screen
                name="TabOne"
                component={TabOneScreen}
                options={{
                  title: "Tab đầu",
                  tabBarIcon: () => (
                    <TabBarIcon name="image-outline" />
                  ),
                }}
              />
              <AuthTabs.Screen
                name="TabTwo"
                component={TabTwoScreen}
                options={{
                  title: "Tab hai",
                  tabBarIcon: () => (
                    <TabBarIcon name="camera-outline" />
                  ),
                }}
              />
              <AuthTabs.Screen
                name="Personal"
                component={PersonalScreen}
                options={{
                  title: "Thông tin cá nhân",
                  tabBarIcon: () => (
                    <TabBarIcon name="person-outline" />
                  ),
                }}
              />
            </AuthTabs.Navigator>
            :
            <UnAuthStack.Navigator>
              <UnAuthStack.Screen
                name="Login"
                options={{
                  title: "Đăng nhập"
                }}
                component={LoginScreen}
              />
              <UnAuthStack.Screen
                name="Register"
                options={{
                  title: "Đăng ký",

                }}
                component={RegisterScreen}
              />
            </UnAuthStack.Navigator>
        }

      </NavigationContainer>
    </AuthContext.Provider>
  );
}
