import React from 'react';
import { SafeAreaView, TouchableOpacity,View } from 'react-native';
import { useEffect, useState } from 'react';
import BookingStepIndicator from '../components/BookingStepIndicator';
import { Text } from '../components/Themed';
import Services from '../utils/Services';
import { Button, Card, Divider } from 'react-native-paper';
import { useStyle } from '../utils/style';
import { toVND } from '../utils/CurrencyHelper';

function SuccessScreen(props) {
  const { navigation, route } = props;
  const { params } = route;
  const { pkg } = params;
  const styles = useStyle();
  const onContinuePress = () => {
    navigation.navigate('Packages');
  }
  const onPreviewMakeupPress = () => {
    navigation.push('PreviewMakeup');
  }
  return (
    <SafeAreaView style={styles.packageDetailsContainer}>
      <BookingStepIndicator currentStep={4} />
      <Card style={styles.customerInformation}>
      <Text style={{fontWeight: 'bold',fontSize: 20,marginTop:40,marginBottom: 30,alignSelf: 'center',color: '#FB6F6F'}}>
            Giao dịch thành công
      </Text >
      <View style={{height:1,width:"80%",backgroundColor:"#000",alignSelf:'center'}}></View>
        <TouchableOpacity onPress={onPreviewMakeupPress} style={styles.packageDetailsBookingButton}>
          <Text style={{ color: "#2D71D7", fontWeight: "bold", fontSize: 20 }}>Thử kiểu trang điểm</Text>
        </TouchableOpacity>
      </Card>
      <Card style={[styles.packageDetailsFooter,{backgroundColor:"#2D71D7"}]}>
        <TouchableOpacity onPress={onContinuePress} style={styles.packageDetailsBookingButton}>
          <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 20 }}>Về trang chủ</Text>
        </TouchableOpacity>
      </Card>
    </SafeAreaView>

  );
}

export default SuccessScreen;