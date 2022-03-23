import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useStyle } from "../utils/style";


const styles = useStyle();


const RegisterScreen = ({ navigation }) => {

  const [firstName, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState();
  const [birthday, setBirthday] = useState();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.link}
      >
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );

}

export default RegisterScreen;

