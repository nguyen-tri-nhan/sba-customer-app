import { createStackNavigator } from "@react-navigation/stack";
import PackagesScreen from "../screens/PackagesScreen";

const Navigation = createStackNavigator();

export const PackagesStack = (props) => {
  const {jwt, user} = props.route.params;
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
    </Navigation.Navigator>
  )
}