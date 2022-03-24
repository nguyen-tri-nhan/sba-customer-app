import { StyleSheet } from "react-native";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import DataLoader from "../model/Dataloader";
import { ENTITY } from "../utils/Constants";

export default function TabOneScreen(props) {

  const { jwt } = props.route.params;

  const renderData = (data) => {
    console.log('data', data);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      <DataLoader jwt={jwt} entity={ENTITY.PACKAGE} renderData={renderData} getAll/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
