import { Text, TouchableOpacity, TouchableHighlight, View, TextInput, Button } from "react-native";
import React, { useState, useContext } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../utils/context";
import { useStyle } from "../utils/style";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const styles = useStyle();


const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);
  const [isSigninInProgress,setSigninInProgress] = useState(false)

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

  const _signIn = async () => {

    GoogleSignin.configure({
      androidClientId: 'AIzaSyBbT1vHm9ecA7S_v15Iwefb7ctmMryUUec',
    });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // this.setState({ userInfo });
      console.log('login gamil thanh cong', userInfo.user);
      const email = userInfo.user.email;
      const name = userInfo.user.name;
      const photoUrl = user.user.photo
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

  return (
    <View style={styles.container}>
      <Ionicons name="camera-outline" size={100} />
      <Text style={styles.titleText}>Studio Booking Application</Text>
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
      <TouchableHighlight
        style={styles.submit}
        onPress={onLoginPress}
        underlayColor="#91bfe6"
      >
        <Text style={styles.submitText}>Đăng nhập</Text>
      </TouchableHighlight>
      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        style={styles.link}
      >
        <Text style={styles.linkText}>Chưa có tài khoản? Đăng ký ngay</Text>
      </TouchableOpacity>

      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={_signIn}
        disabled={isSigninInProgress}
      />
      
    </View>
  );

}

export default LoginScreen;

