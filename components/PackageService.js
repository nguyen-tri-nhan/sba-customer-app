import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import { toVND } from '../utils/CurrencyHelper';
import { useStyle } from '../utils/style';
import { Text, View } from './Themed';

function PackageService({ pkg, navigation }) {

  const styles = useStyle();

  const onPkgPress = () => {
    navigation.push('PackagesDetails', { pkg: pkg })
  }

  return (
    <TouchableOpacity onPress={onPkgPress} >
      <Card style={styles.packagesItem}>
        <Card.Content>
          <Title>{pkg.name}</Title>
          <Paragraph>Địa điểm: {pkg.location}</Paragraph>
          <Card.Cover source={{ uri: pkg.images[0].imageUrl }} />
          <Text style={styles.packagesPrice}>Giá: {toVND(pkg.price)}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

export default PackageService;