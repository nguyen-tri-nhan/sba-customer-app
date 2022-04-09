// If you are not familiar with React Navigation, check out the "Fundamentals" guide:
// https://reactnavigation.org/docs/getting-started
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState, useEffect, useMemo, useRef } from "react";
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
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

export default function Navigation({ colorScheme }) {
  const [jwt, setJwt] = useState('');
  const [userDetails, setUserDetails] = useState();

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

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
      scheduleNotification: (dateTime, title, body, data) => {
        schedulePushNotification(dateTime, title, body, data);
      }
    };
  }, []);

  const getUserContext = () => {
    AsyncStorageLib.getItem("JWT")
    .then((data) => {
      setJwt(data);
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
  }

  const registerNotification = () => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }

  useEffect(() => {
    getUserContext();
    registerNotification();
  }, []);

  const tabIconProps = {
    size: 30,
    style: { marginBottom: -3 }
  }

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

  const schedulePushNotification = async (dateTime, title, body, data) => {
    const trigger = new Date(dateTime);
    const now = new Date();
    trigger.setHours(now.getHours);
    trigger.setMinutes(now.getMinutes + 1);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        data: { data: data },
      },
      trigger: {seconds: 10}
    });
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
                initialParams={{ user: userDetails, jwt: jwt }}
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
                initialParams={{ user: userDetails, jwt: jwt }}
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
