import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../utils/context";
import Icon from "react-native-dynamic-vector-icons";


export default function PersonalScreen({ navigation, route }) {

  const { logout } = useContext(AuthContext);

  const onLogoutClick = (e) => {
    logout();
  }

  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Icon
              name="people"
              type="Ionicons"
              size={150}
              style={{top:20}}
            />
      <View style={[styles.conRow,{marginTop:40}]}>
        <Text style={styles.title}>Tên khách hàng: </Text>
        <Text style={styles.title}>{user.firstname} {user.lastname}</Text>
      </View>
      <View style={styles.divineLine} />
      <View style={[styles.conRow,{marginTop:20}]}>
        <Text style={styles.title}>Email: </Text>
      <Text style={styles.title}>{user.email}</Text>
      </View>
      <View style={styles.divineLine} />
      <View style={[styles.conRow,{marginTop:20}]}>
        <Text style={styles.title}>Số điện thoại: </Text>
      <Text style={styles.title}>{user.phoneNumber}</Text>
      </View>
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
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title2: {
    fontSize: 20,
  },
  link: {
    top: 50,
    paddingVertical: 15,
    borderWidth:0.5,
    width:"50%",
    alignItems:'center',
    backgroundColor: "#E14C4C",
  },
  linkText: {
    fontSize: 17,
    color: "#fff",
    fontWeight:'bold'
  },
  conRow:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:"90%"
  },
  
  divineLine: {
    width: "90%",
    height: 1,
    opacity: 0.5,
    marginBottom: 5,
    backgroundColor: "#4A4A4A",
    marginTop:10
  }
});
