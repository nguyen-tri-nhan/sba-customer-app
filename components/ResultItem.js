import React from 'react';
import { TouchableOpacity, Image, StyleSheet,View,Text } from 'react-native';
import { useStyle } from '../utils/style';
import { Card } from 'react-native-paper';

function ResultItem({ sourceImg, item }) {

  const styles = useStyle();

 

  return (
    <Card style={stylesA.card}>
          <View style={stylesA.container}>
          <View style={stylesA.conLink}>
          <View style={stylesA.conImage1}>
              <Image source={{uri:sourceImg}}
                style={{ flex: 1, width: 200, height: 50, alignSelf: 'center', marginTop: 10, resizeMethod: 'resize', resizeMode: 'contain',marginBottom:20 }}>
              </Image>
              <Text style={stylesA.text}>Ảnh gốc</Text>
          </View>
              <View style={stylesA.divineLine} />
          <View style={stylesA.conImage1}>
              <Image source={{uri:item.refer}}
                style={{ flex: 1, width: 200, height: 50, alignSelf: 'center', marginTop: 10, resizeMethod: 'resize', resizeMode: 'contain',marginBottom:20 }}>
              </Image>
              <Text style={stylesA.text}>Ảnh tham chiếu</Text>
          </View>
          </View>
      </View>
              <View style={stylesA.divineLineRow} />
      <View style={stylesA.conImage2}>
              <Image source={{uri:item.result}}
                style={{ flex: 1, width: 200, height: 50, alignSelf: 'center', marginTop: 10, resizeMethod: 'resize', resizeMode: 'contain' }}>
              </Image>
              <Text style={[stylesA.text,{bottom:20}]}>Kết quả</Text>
          </View>
    </Card>
  );
}

const stylesA = StyleSheet.create({
  card: {
    flex: 9,
    backgroundColor: "#FFF",
    marginTop: 40,
    marginLeft: 30,
    marginRight: 10,
    width:"87%"
  },
  container:{
    flexDirection:"column",
    justifyContent:"space-around"
  },
  conLink:{
    flexDirection:"row",
    justifyContent:"space-around"
  },
  conImage1:{
    width:200,
    height:200,
    alignSelf:'center',
    marginTop:20,
    flexDirection:"column",
    justifyContent:"space-around"
  },
  conImage2:{
    width:300,
    height:300,
    alignSelf:'center',
    flexDirection:"column",
    justifyContent:"space-around"
  },
  text:{
    alignSelf:'center',
    fontSize:18,
    fontWeight:"bold"
  },
  divineLine: {
    width: 1,
    height: "110%",
    opacity: 0.5,
    backgroundColor: "#4A4A4A"
  },
  divineLineRow: {
    width: "100%",
    height: 1,
    opacity: 0.5,
    backgroundColor: "#4A4A4A",
    marginTop:20
  }

  
})

export default ResultItem;