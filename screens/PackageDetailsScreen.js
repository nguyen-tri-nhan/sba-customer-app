import { isEmpty, unionBy } from 'lodash';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, ScrollView, Text } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import AdditionalItem from '../components/AdditionalItem';
import DataLoader from '../model/Dataloader';
import { ENTITY, STATUS } from '../utils/Constants';
import { toVND } from '../utils/CurrencyHelper';
import { useStyle } from '../utils/style';

function PackageDetailsScreen(props) {

  const styles = useStyle();

  const { navigation, route } = props;
  const { params } = route;
  const { pkg, jwt } = params;

  const [additionalItems, setAdditionalItems] = useState([]);

  const getImagesList = (imgs) => {
    if (imgs) {
      return imgs.map((item) => item.imageUrl);
    }
    return;
  }

  const images = getImagesList(pkg.images);

  const onBookingPress = () => {
    navigation.push("ChooseShowroom", { pkg: pkg, additionalItems: additionalItems, totalPrice: countTotalPrice() });
  }

  const onAmountChange = (item, amount) => {
    item.amount = amount;
    const res = unionBy([item], additionalItems, 'id');
    setAdditionalItems(res);
  }

  const renderAdditionalItem = (data) => {
    if (isEmpty(data)) {
      return;
    }
    setAdditionalItems(data);
    return data.map((item) => (<AdditionalItem onAmountChange={onAmountChange} key={item.id} item={item} />))
  }

  const countTotalPrice = () => {
    let total = 0;
    total += pkg.price;
    additionalItems.forEach((item) => {
      if (item.amount) {
        total += item.amount * item.price;
      }
    })
    return total;
  }

  return (

    <SafeAreaView style={styles.packageDetailsContainer}>
      <Card key={'1'} style={styles.imageSliderCard}>
        <SliderBox key={pkg.id} images={images} />
      </Card>
      <Card key={'2'} style={styles.packageDetailsTitleCard}>
        <ScrollView>
          <Title style={styles.packageDetailsTitle}>{pkg.name}</Title>
          <Title style={styles.packageDetailsPrice}>Giá: {toVND(pkg.price)}</Title>
          <Text>Thời gian thực hiện: {pkg.duration} ngày</Text>
          <Text>Địa điểm: {pkg.location}</Text>
          <Text>Mô tả:</Text>
          <Paragraph>{pkg.description}</Paragraph>
          <Text style={styles.mt_40}>Dịch vụ thêm: </Text>
          <DataLoader key={'1'} jwt={jwt} entity={ENTITY.ADDITIONAL_ITEM} renderData={renderAdditionalItem} getAll initialStatus={STATUS.ENABLE} />
        </ScrollView>
      </Card>
      <Card style={styles.packageDetailsFooter}>
        <TouchableOpacity onPress={onBookingPress} style={styles.packageDetailsBookingButton}>
          <Button>Đặt ngay: {toVND(countTotalPrice())}</Button>
        </TouchableOpacity>
      </Card>
    </SafeAreaView>
  );
}

export default PackageDetailsScreen;