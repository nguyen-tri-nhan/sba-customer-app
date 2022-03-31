import React from 'react';
import { SafeAreaView } from 'react-native';
import BookingStepIndicator from '../components/BookingStepIndicator';
import { Text } from '../components/Themed';

function BookingScreen2(props) {
  const { navigation, route } = props;
  const { params } = route;
  const { pkg } = params;
  return (
    <SafeAreaView>
      <BookingStepIndicator  currentStep={1} />
      <Text>
        {pkg.name}
      </Text>
    </SafeAreaView>

  );
}

export default BookingScreen2;