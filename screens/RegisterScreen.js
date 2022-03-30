import { useState } from "react";
import { TextInput, Text, TouchableOpacity, View } from "react-native";
import { useStyle } from "../utils/style";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "../components/DatePicker";

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
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          placeholderTextColor="#003f5c"
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputView}>
        <DatePicker onConfirm={setBirthday}/>
      </View>
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

