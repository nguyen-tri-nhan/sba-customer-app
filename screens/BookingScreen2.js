import React from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import BookingStepIndicator from '../components/BookingStepIndicator';
import { Text } from '../components/Themed';
import Services from '../utils/Services';
import { Button, Card } from 'react-native-paper';
import { useStyle } from '../utils/style';
import { toVND } from '../utils/CurrencyHelper';

function BookingScreen2(props) {
  const { navigation, route } = props;
  const { params } = route;
  const { pkg, jwt, user, forwardedItems, totalPrice, showroom } = params;

  const styles = useStyle();
  const onContinuePress = () => {
    navigation.push("Booking3", { pkg });
  }
  return (
    <SafeAreaView style={styles.packageDetailsContainer}>
      <BookingStepIndicator currentStep={1} />
      <Card style={styles.customerInformation}>
        <Text>
          {pkg.name}
        </Text>
      </Card>
      <Card style={styles.packageDetailsFooter}>
        <TouchableOpacity onPress={onContinuePress} style={styles.packageDetailsBookingButton}>
          <Button>Đặt ngay: {toVND(totalPrice)}</Button>
        </TouchableOpacity>
      </Card>
    </SafeAreaView>
  );
}

export default BookingScreen2;