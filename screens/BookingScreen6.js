import React from 'react';
import { SafeAreaView } from 'react-native';
import BookingStepIndicator from '../components/BookingStepIndicator';
import { Text } from '../components/Themed';

function BookingScreen6(props) {
  const { navigation, route } = props;
  const { params } = route;
  const { pkg } = params;
  return (
    <SafeAreaView>
      <BookingStepIndicator  currentStep={5} />
      <Text>
        {pkg.name}
      </Text>
    </SafeAreaView>

  );
}

export default BookingScreen6;