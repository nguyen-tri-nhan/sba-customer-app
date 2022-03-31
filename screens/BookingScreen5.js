import React from 'react';
import { SafeAreaView } from 'react-native';
import BookingStepIndicator from '../components/BookingStepIndicator';
import { Text } from '../components/Themed';

function BookingScreen5(props) {
  const { navigation, route } = props;
  const { params } = route;
  const { pkg } = params;
  return (
    <SafeAreaView>
      <BookingStepIndicator  currentStep={4} />
      <Text>
        {pkg.name}
      </Text>
    </SafeAreaView>

  );
}

export default BookingScreen5;