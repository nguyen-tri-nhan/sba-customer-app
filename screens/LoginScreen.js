import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button } from "react-native";
import React, { useState, useContext } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../utils/context";

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
    marginBottom: 32
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },

  textInput: {
    height: 50,
    flex: 1,
  },
  titleText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 24
  }
});


const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useContext(AuthContext);

  const user = {
    email,
    password
  };

  const onEmailChange = (text) => {
    setEmail(text);
  };

  const onPasswordChange = (text) => {
    setPassword(text);
  };

  const onLoginPress = (e) => {
    e.preventDefault();
    login(user);
  }

  return (
    <View style={styles.container}>
      <Ionicons name="camera-outline" size={100} />
      <Text style={styles.titleText}>Ứng dụng hỗ trợ đặt lịch chụp ảnh tại studio</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          placeholderTextColor="#003f5c"
          onChangeText={onEmailChange}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Mật khẩu"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={onPasswordChange}
        />
      </View>
      <Button
        title="Đăng nhập"
        onPress={onLoginPress}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        style={styles.link}
      >
        <Text style={styles.linkText}>Chưa có tài khoản? Đăng ký ngay</Text>
      </TouchableOpacity>
    </View>
  );

}

export default LoginScreen;

