import React from 'react';
import {SafeAreaView, Image, ScrollView, View,StyleSheet,Text,TouchableOpacity } from 'react-native';
import { useStyle } from '../utils/style';
import { Card } from 'react-native-paper';
import StyleTracking from '../components/StyleTracking';

function BookingStyleScreen(props) {
  const { navigation, route } = props;
  const { params } = route;
  const { data } = params;
  const styles = useStyle();

  const renderLinks = () => {
      console.log(data);
      var items = []
      data.forEach(ele => {
        items.push(<StyleTracking item={ele} />)
      });
    return items;
  }
  const onContinuePress = () => {
      navigation.navigate('Packages');
  }


  return (
    
    <SafeAreaView style={styles.packageDetailsContainer}>
      <View style={{flex:9}}>
      <ScrollView >
        {data ?
          renderLinks() :
          (<View/>)}
      </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const stylesA = StyleSheet.create({
  
  card: {
    flex: 9,
    backgroundColor: "#FFF",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  cardFooter:{
    height:20
  }
})

export default BookingStyleScreen;