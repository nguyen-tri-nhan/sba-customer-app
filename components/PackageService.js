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
            <Text style={[styles.packageTitle,{fontSize:13}]}>{pkg.name}</Text>
            <Text style={[styles.packageTextSecondary]}>Địa điểm: {pkg.location}</Text>
            <View
              style={styleA.star}>
              <StarReview
                ratings={pkg.review.score}
                stars={5}
                starColor="#FFDF6F"
                reviews={pkg.review.reviewNum}
                reviewsText="đánh giá"
              />
            </View>
            <View style={styleA.conPrice}>
              <Text style={[styles.packagesPrice,{fontSize:12}]}>Thời gian: {pkg.duration} ngày</Text>
              <View style={styleA.divineLine} />
              <Text style={[styles.packagesPrice,{fontSize:12}]}>Giá: {toVND(pkg.price)}</Text>
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
    marginLeft: 30,
    marginRight: 10,
    width:"87%"
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
    width: '80%',
    flex: 1,
    padding: 10,
    // margin: 5,
    // marginRight:10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius:10,
  },
  packageImage: {
    top: -25,
    left: -30,
    position: "absolute",
    width: 120,
    height: 120,
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
    // justifyContent: 'space-between'
  },
  star: {
    paddingTop: 10,
    alignItems: 'flex-start'
  },
  divineLine: {
    width: 1,
    height: 20,
    top:10,
    opacity: 0.5,
    marginLeft: 10,
    marginRight:10,
    backgroundColor: "#4A4A4A"
  }
})

export default PackageService;