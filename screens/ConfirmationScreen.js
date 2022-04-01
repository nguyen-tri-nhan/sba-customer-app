import React from 'react';
import { SafeAreaView, TouchableOpacity, ScrollView, View } from 'react-native';
import BookingStepIndicator from '../components/BookingStepIndicator';
import { Text } from '../components/Themed';
import { Button, Card } from 'react-native-paper';
import { useStyle } from '../utils/style';
import { toVND } from '../utils/CurrencyHelper';

function ConfirmationScreen(props) {
  const { navigation, route } = props;
  const { params } = route;
  const { pkg, jwt, user, forwardedItems, totalPrice, showroom } = params;

  const styles = useStyle();
  const onContinuePress = () => {
    navigation.push("Payment", { pkg, forwardedItems, totalPrice, showroom });
  }

  console.log(forwardedItems);
  return (
    <SafeAreaView style={styles.packageDetailsContainer}>
      <BookingStepIndicator currentStep={1} />
      <Card style={styles.customerInformation}>
        <ScrollView>
          <Text>
            Gói dịch vụ: {pkg.name}
          </Text>
          <Text>
            Địa điểm: {pkg.location}
          </Text>
          <Text>
            Chi nhánh thực hiện: {showroom.name}
          </Text>
          <Text>
            Địa chỉ: {showroom.address}
          </Text>
          <Text>
            Dịch vụ thêm:
          </Text>
          {
            forwardedItems.map((item) =>
            (<View key={item.id}>
              <Text>{item.itemName} {item.amount}</Text>
            </View>))
          }
        </ScrollView>
      </Card>
      <Card style={styles.packageDetailsFooter}>
        <TouchableOpacity onPress={onContinuePress} style={styles.packageDetailsBookingButton}>
          <Button>Thanh toán: {toVND(totalPrice)}</Button>
        </TouchableOpacity>
      </Card>
    </SafeAreaView>
  );
}

export default ConfirmationScreen;