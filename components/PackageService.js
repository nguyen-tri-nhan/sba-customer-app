import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { toVND } from '../utils/CurrencyHelper';
import { useStyle } from '../utils/style';
import { Text, View } from './Themed';
import { Card } from 'react-native-paper';
import StarReview from 'react-native-star-review'

function PackageService({ pkg, navigation }) {

  const styles = useStyle();

  const onPkgPress = () => {
    navigation.push('PackagesDetails', { pkg: pkg })
  }

  return (
    <Card style={styleA.card}>
      <TouchableOpacity style={styles.packageContainer} onPress={onPkgPress} >
        <View style={styleA.packagesItem}>
          <View style={styleA.containerImg}>
            <Image style={styleA.packageImage} source={{ uri: pkg.images[0].imageUrl }} />
          </View>
          <View style={styles.packageInfomation}>
            <Text style={styles.packageTitle}>{pkg.name}</Text>
            <Text style={styles.packageTextSecondary}>Địa điểm: {pkg.location}</Text>
            <View
              style={styleA.star}>
              <StarReview
                ratings={3.5}
                stars={5}
                starColor="#FFDF6F"
                reviews={100}
                reviewsText="đánh giá"
              />
            </View>
            <View style={styleA.conPrice}>
              <Text style={styles.packagesPrice}>Thời gian: {pkg.duration} ngày</Text>
              <View style={styleA.divineLine} />
              <Text style={styles.packagesPrice}>Giá: {toVND(pkg.price)}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
}

const styleA = StyleSheet.create({
  card: {
    flex: 9,
    backgroundColor: "#FFF",
    marginTop: 40,
    marginLeft: 40,
    marginRight: 20
  },
  text: {
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10,
  },
  box: {
    marginLeft: 25,
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 25,
    marginTop: 10
  },
  boxh1: {

  },
  h1: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    color: '#FB6F6F'
  },
  h2: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  h3: {
    fontSize: 16,
  },

  packagesItem: {
    minWidth: 360,
    width: '90%',
    flex: 1,
    padding: 10,
    margin: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  packageImage: {
    top: -35,
    left: -40,
    position: "absolute",
    width: 110,
    height: 125,
    flex: 3,
    borderRadius: 20,
  },
  containerImg: {
    width: 100,
    height: 100,
    flex: 3,
    borderRadius: 30

  },
  conPrice: {
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  star: {
    paddingTop: 10,
    alignItems: 'flex-start'
  },
  divineLine: {
    width: 1,
    height: 35,
    opacity: 0.5,
    marginLeft: 10,
    backgroundColor: "#4A4A4A"
  }
})

export default PackageService;