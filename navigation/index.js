// If you are not familiar with React Navigation, check out the "Fundamentals" guide:
// https://reactnavigation.org/docs/getting-started
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { isLoggedIn } from "../model/MAuth";

import AuthenticatedNavigator from "./AuthenticatedNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import UnAuthenticatedNavigator from "./UnAuthenticatedNavigator";
import Config from "react-native-config";
import { useState } from "react";

export default function Navigation({ colorScheme }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();

function RootNavigator() {
  const [loggedIn, setLoggedIn] = useState(false);
  isLoggedIn().then(data => {
    setLoggedIn(data);
  })
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {
        loggedIn ?
          <Stack.Screen name="Root" component={AuthenticatedNavigator} />
          : <Stack.Screen name="Unauthenticated" component={UnAuthenticatedNavigator}
          />
      }
    </Stack.Navigator>
  );
}
