import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


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


const RegisterScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("LoginScreen")}
        style={styles.link}
      >
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );

}

export default RegisterScreen;

