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
  const [isSigninInProgress, setSigninInProgress] = useState(false)

  const { login, loginWithGoogle } = useContext(AuthContext);

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
      const email = userInfo.user.email;
      const firstname = userInfo.user.familyName;
      const lastname = userInfo.user.givenName;
      loginWithGoogle(email, firstname, lastname, errorHandler);
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
    <View style={[styles.container]}>
      <View style={{alignItems:'center',top:-100}}>
      <Ionicons name="camera-outline" size={100} />
      <Text style={styles.titleText}>Studio Booking Application</Text>
      </View>
      {/* <View style={styles.inputView}>
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
          placeholder="M???t kh???u"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={onPasswordChange}
        />
      </View>
      {
        loginFailed && 
        <Text style={styles.errorMessageText}>Email ho???c m???t kh???u kh??ng ????ng, vui l??ng nh???p l???i</Text>
      }
      <TouchableHighlight
        style={styles.submit}
        onPress={onLoginPress}
        underlayColor="#91bfe6"
      >
        <Text style={styles.submitText}>????ng nh???p</Text>
      </TouchableHighlight> */}
      {/* <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        style={styles.link}
      >
        <Text style={styles.linkText}>Ch??a c?? t??i kho???n? ????ng k?? ngay</Text>
      </TouchableOpacity> */}

      <GoogleSigninButton
        style={{ width: 192, height: 48 ,top:-60}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={_signIn}
        disabled={isSigninInProgress}
      />
      
    </View>
  );

}

export default LoginScreen;

