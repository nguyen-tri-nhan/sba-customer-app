import React from 'react';
import { SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import BookingStepIndicator from '../components/BookingStepIndicator';
import { Text } from '../components/Themed';
import Services from '../utils/Services';
import { Button, Card } from 'react-native-paper';
import { useStyle } from '../utils/style';
import { toVND } from '../utils/CurrencyHelper';
import DataLoader from '../model/Dataloader';
import { ENTITY, STATUS } from '../utils/Constants';
import Showroom from '../components/Showroom';

function ChooseShowroomScreen(props) {
  const { navigation, route } = props;
  const { params } = route;
  const { pkg, jwt, user, additionalItems, totalPrice } = params;

  const forwardedItems = additionalItems.filter((item) => item.amount > 0);

  const styles = useStyle();

  const onContinuePress = (showroom) => {
    navigation.push("Confirmation", { pkg, user, forwardedItems, totalPrice, showroom });
  }

  const renderShowrooms = (data) => {
    return data.map((showroom) => <Showroom showroom={showroom} onSelectedShowroom={onContinuePress}/>)
  }

  return (
    <SafeAreaView style={styles.packageDetailsContainer}>
      <BookingStepIndicator currentStep={0} />
      <Card style={styles.customerInformation}>
        <ScrollView>
          <Text>
            {pkg.name}
          </Text>
          <DataLoader key={'1'} jwt={jwt} entity={ENTITY.SHOWROOM} renderData={renderShowrooms} getAll initialStatus={STATUS.ENABLE} /> 
        </ScrollView>
      </Card>
      {/* <Card style={styles.packageDetailsFooter}>
        <TouchableOpacity onPress={onContinuePress} style={styles.packageDetailsBookingButton}>
          <Button>Đặt ngay: {toVND(totalPrice)}</Button>
        </TouchableOpacity>
      </Card> */}
    </SafeAreaView>

  );
}

export default ChooseShowroomScreen;