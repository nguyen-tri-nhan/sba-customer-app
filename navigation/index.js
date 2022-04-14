// If you are not familiar with React Navigation, check out the "Fundamentals" guide:
// https://reactnavigation.org/docs/getting-started
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState, useEffect, useMemo } from "react";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import PersonalScreen from "../screens/PersonalScreen";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from "../utils/context";
import { isEmpty } from "lodash";
import Services from "../utils/Services";
import { PackagesStack } from "../stack/PackageStack";
import { HistoryStack } from "../stack/HistoryStack";
import AsyncStorageLib from "@react-native-async-storage/async-storage";

export default function Navigation({ colorScheme }) {
  const [jwt, setJwt] = useState('');
  const [userDetails, setUserDetails] = useState();
  const [depositsPercentage, setDepositPercentage] = useState();

  const authContext = useMemo(() => {
    return {
      getMe: () => {
        return userDetails;
      },
      login: (user, errorHandler) => {
        Services.login(user, errorHandler)
          .then(({ data }) => {
            const jwtToken = `Bearer ${data.accessToken}`;
            setJwt(jwtToken);
            AsyncStorageLib.setItem("JWT", jwtToken)
            return jwtToken;
          })
          .then((jwt) => {
            Services.getMe(jwt)
              .then(({ data }) => {
                setUserDetails(data);
              })
          })
      },
      logout: () => {
        AsyncStorageLib.clear(() => {
          setJwt('');
          setUserDetails();
        })
      },
      getJwt: () => {
        return jwt;
      },
      loginWithGoogle: (email, firstname, lastname, errorHandler) => {
        Services.loginWithGoogle({ email, firstname, lastname }, errorHandler)
          .then(({ data }) => {
            const jwtToken = `Bearer ${data.accessToken}`;
            setJwt(jwtToken);
            AsyncStorageLib.setItem("JWT", jwtToken)
            return jwtToken;
          })
          .then((jwt) => {
            Services.getMe(jwt)
              .then(({ data }) => {
                setUserDetails(data);
              })
          })
      }
    };
  }, []);

  const getConfiguration = (jwt) => {
    Services.getConfiguration("depositsPercentage", jwt)
      .then(({ data }) => {
        const { value } = data;
        setDepositPercentage(value);
      })

  }

  useEffect(() => {
    AsyncStorageLib.getItem("JWT")
      .then((data) => {
        setJwt(data);
        getConfiguration(data);
        return data;
      })
      .then((token) => {
        if (token) {
          Services.getMe(token)
            .then(({ data }) => {
              setUserDetails(data);
            })
        }
      })
  }, []);

  const tabIconProps = {
    size: 30,
    style: { marginBottom: -3 }
  }

  const UnAuthStack = createStackNavigator();
  const AuthTabs = createBottomTabNavigator();
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        {
          !isEmpty(userDetails)
            ?
            <AuthTabs.Navigator
              screenOptions={{ headerShown: false }}
            >
              <AuthTabs.Screen
                name="TabOne"
                component={PackagesStack}
                initialParams={{ user: userDetails, jwt: jwt, depositsPercentage: depositsPercentage }}
                options={{
                  title: "Dịch vụ",
                  tabBarIcon: () => (
                    <MaterialCommunityIcons name="image-outline" {...tabIconProps} />
                  ),
                }}
              />
              <AuthTabs.Screen
                name="TabTwo"
                component={HistoryStack}
                initialParams={{ user: userDetails, jwt: jwt, depositsPercentage: depositsPercentage }}
                options={{
                  title: "Lịch sử",
                  tabBarIcon: () => (
                    <MaterialCommunityIcons name="table-clock"  {...tabIconProps} />
                  ),
                }}
              />
              <AuthTabs.Screen
                name="Personal"
                component={PersonalScreen}
                initialParams={{ user: userDetails, jwt: jwt }}
                options={{
                  title: "Thông tin cá nhân",
                  tabBarIcon: () => (
                    <Ionicons name="person-outline" {...tabIconProps} />
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
