import React from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import BookingStepIndicator from '../components/BookingStepIndicator';
import { Text } from '../components/Themed';
import Services from '../utils/Services';
import { Button, Card } from 'react-native-paper';
import { useStyle } from '../utils/style';
import { toVND } from '../utils/CurrencyHelper';

function BookingScreen(props) {
  const { navigation, route } = props;
  const { params } = route;
  const { pkg, jwt, user } = params;

  const styles = useStyle();
  const [showrooms, setShowrooms] = useState();
  const [selectedShowroom, setSelectedShowroom] = useState();

  useEffect(() => {
    Services.getShowrooms(jwt).then(({ data }) =>
      setShowrooms(data.content)
    );
  }, []);

  console.log(showrooms)
  const onContinuePress = () => {
    navigation.push("Booking2", { pkg });
  }

  return (
    <SafeAreaView style={styles.packageDetailsContainer}>
      <BookingStepIndicator currentStep={0} />
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

export default BookingScreen;