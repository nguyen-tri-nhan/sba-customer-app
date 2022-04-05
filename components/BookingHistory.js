import React from 'react';
import { View } from 'react-native';

function BookingHistory({ booking }) {
  return (
    <View>
      <Text>{booking.id}</Text>
    </View>
  );
}

export default BookingHistory;