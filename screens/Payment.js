import React from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import BookingStepIndicator from '../components/BookingStepIndicator';
import { Text } from '../components/Themed';
import Services from '../utils/Services';
import { Button, Card } from 'react-native-paper';
import { useStyle } from '../utils/style';
import { toVND } from '../utils/CurrencyHelper';

function Payment(props) {
  const { navigation, route } = props;
  const { params } = route;
  const { pkg } = params;
  const styles = useStyle();
  const onContinuePress = () => {
    navigation.push("PreviewMakeup", { pkg });
  }
  return (
    <SafeAreaView style={styles.packageDetailsContainer}>
      <BookingStepIndicator currentStep={2} />
      <Card style={styles.customerInformation}>
        <Text>
          {pkg.name}
        </Text>
      </Card>
      <Card style={styles.packageDetailsFooter}>
        <TouchableOpacity onPress={onContinuePress} style={styles.packageDetailsBookingButton}>
          <Button>Đặt ngay: {toVND(pkg.price)}</Button>
        </TouchableOpacity>
      </Card>
    </SafeAreaView>
  );
}

export default Payment;