import React from 'react';
import { SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import { Text } from '../components/Themed';
import { toVND } from '../utils/CurrencyHelper';
import { useStyle } from '../utils/style';

function PackageDetailsScreen(props) {

  const styles = useStyle();

  const { navigation, route } = props;
  const { params } = route;
  const { pkg } = params;

  const getImagesList = (imgs) => {
    if (imgs) {
      return imgs.map((item) => item.imageUrl);
    }
    return;
  }

  const images = getImagesList(pkg.images);

  const onBookingPress = () => {
    navigation.push("Booking", { pkg: pkg });
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
          <Text>//TODO: Add addtitional item</Text>
        </ScrollView>
      </Card>
      <Card style={styles.packageDetailsFooter}>
        <TouchableOpacity onPress={onBookingPress} style={styles.packageDetailsBookingButton}>
          <Button>Đặt ngay: {toVND(pkg.price)}</Button>
        </TouchableOpacity>
      </Card>
    </SafeAreaView>
  );
}

export default PackageDetailsScreen;