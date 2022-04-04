import React from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
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
        <Text>
          Giao dịch thành công
        </Text>
        <TouchableOpacity onPress={onPreviewMakeupPress} style={styles.packageDetailsBookingButton}>
          <Button>Thử kiểu trang điểm</Button>
        </TouchableOpacity>
      </Card>
      <Card style={styles.packageDetailsFooter}>
        <TouchableOpacity onPress={onContinuePress} style={styles.packageDetailsBookingButton}>
          <Button>Về trang chủ</Button>
        </TouchableOpacity>
      </Card>
    </SafeAreaView>

  );
}

export default SuccessScreen;