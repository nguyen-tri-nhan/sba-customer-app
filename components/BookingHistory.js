import React from 'react';
import { View, Text } from 'react-native';

function BookingHistory({ booking }) {
  return (
    <View>
      <Text>{booking.price}</Text>
    </View>
  );
}

export default BookingHistory;