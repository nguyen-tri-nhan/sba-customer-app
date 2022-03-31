import React from 'react';
import { SafeAreaView } from 'react-native';
import BookingStepIndicator from '../components/BookingStepIndicator';
import { Text } from '../components/Themed';

function BookingScreen4(props) {
  const { navigation, route } = props;
  const { params } = route;
  const { pkg } = params;
  return (
    <SafeAreaView>
      <BookingStepIndicator  currentStep={3} />
      <Text>
        {pkg.name}
      </Text>
    </SafeAreaView>

  );
}

export default BookingScreen4;