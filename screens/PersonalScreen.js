import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../utils/context";


export default function PersonalScreen({ navigation, route }) {

  const { logout } = useContext(AuthContext);

  const onLogoutClick = (e) => {
    logout();
  }

  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.firstname} {user.lastname}</Text>
      <Text style={styles.title}>{user.email}</Text>
      <Text style={styles.title}>{user.phoneNumber}</Text>
      <TouchableOpacity
        onPress={onLogoutClick}
        style={styles.link}
      >
        <Text style={styles.linkText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
