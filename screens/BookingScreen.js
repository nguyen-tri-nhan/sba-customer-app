import React from 'react';
import { Text } from '../components/Themed';

function BookingScreen(props) {
  const { navigation, route } = props;
  const { params } = route;
  const { pkg } = params;
  return (
    <Text>
      {pkg.name}
    </Text>
  );
}

export default BookingScreen;