import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { toVND } from '../utils/CurrencyHelper';
import { useStyle } from '../utils/style';
import { Text, View } from './Themed';

function PackageService({ pkg, navigation }) {

  const styles = useStyle();

  const onPkgPress = () => {
    navigation.push('PackagesDetails', { pkg: pkg })
  }

  return (
    <TouchableOpacity style={styles.packageContainer} onPress={onPkgPress} >
      <View style={styles.packagesItem}>
        <Image style={styles.packageImage} source={{ uri: pkg.images[0].imageUrl }} />
        <View style={styles.packageInfomation}>
          <Text style={styles.packageTitle}>{pkg.name}</Text>
          <Text style={styles.packageTextSecondary}>Địa điểm: {pkg.location}</Text>
          <Text style={styles.packagesPrice}>Giá: {toVND(pkg.price)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default PackageService;