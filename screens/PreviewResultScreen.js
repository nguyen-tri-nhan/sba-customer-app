import React from 'react';
import {SafeAreaView, Image, ScrollView, View,StyleSheet,Text,TouchableOpacity } from 'react-native';
import ResultItem from '../components/ResultItem';
import { useStyle } from '../utils/style';
import { Card } from 'react-native-paper';

function PreviewResultScreen(props) {
  const { navigation, route } = props;
  const { params } = route;
  const { sourceImg, links } = params;

  const renderLinks = () => {
      var items = []
      links.forEach(link => {
        items.push(<ResultItem item={link} sourceImg={sourceImg} />)
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
        {links ?
          renderLinks() :
          (<View/>)}
      </ScrollView>
      </View>
      <Card style={[styles.packageDetailsFooter,{marginTop:10}]}>
        <TouchableOpacity onPress={onContinuePress} style={[styles.packageDetailsBookingButton]}>
          <Text style={{color:"#FFF",fontWeight:"bold",fontSize:20}}>Trang chủ</Text>
        </TouchableOpacity>
      </Card>
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

export default PreviewResultScreen;