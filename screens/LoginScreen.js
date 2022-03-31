import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button } from "react-native";
import React, { useState, useContext } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../utils/context";
import { useStyle } from "../utils/style";

const styles = useStyle();


const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);

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
    login(user, errorHandler);
  };

  const errorHandler = (message) => {
    setLoginFailed(true);
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
      {
        loginFailed && 
        <Text style={styles.errorMessageText}>Email hoặc mật khẩu không đúng, vui lòng nhập lại</Text>
      }
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

