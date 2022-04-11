import React from 'react';
import { View, Text, TouchableOpacity,StyleSheet,Image } from 'react-native';
import { useStyle } from '../utils/style';
import { Card } from 'react-native-paper';

function Showroom({ showroom, onSelectedShowroom }) {

  const styles = useStyle();

  const handlePress = () => {
    if (onSelectedShowroom) {
      onSelectedShowroom(showroom);
    }
  }

  return (
    
    <Card style={styleA.card}>
    <TouchableOpacity style={styles.packageContainer} onPress={handlePress}>
      <View style={styleA.packagesItem}>
      <View style={styleA.containerImg}>
            <Image style={styleA.packageImage} source={{ uri: showroom.avatar }} />
        </View>
      
      <View style={[styleA.packageInfomation
        // ,styleA.box,{backgroundColor:'#ECF9FC'}
      ]}>
        <View style={{backgroundColor:'#FFF',width:"100%",borderRadius:10,right:-10,top:5}}>
          <Text style={[styleA.text,styleA.h1,{alignSelf:'center'}]}>{showroom.name}</Text>
        </View>
        <Text style={[styleA.text,styleA.h2,{alignSelf:'flex-end'}]}>{showroom.address}</Text>
      <Text style={[styleA.text,styleA.h3]}>{showroom.description}</Text>
      </View>
      </View>
    </TouchableOpacity>
     </Card>
  );
}

const styleA = StyleSheet.create({
  card:{
    flex: 9,
      backgroundColor:"#FFF",
      marginTop:30,
      marginLeft:20,
      marginRight:10,
      borderRadius:10
  },
  
  packageInfomation: {
    flex: 8,
    backgroundColor:"#FFF",
  },
  text:{
    marginLeft:10,
    marginTop:5,
    marginBottom:5,
    marginRight:10,
  },
  box:{
    marginLeft:25,
    borderWidth:1,
    borderRadius:20,
    marginRight:25,
    marginTop:10
  },
  boxh1:{

  },
  h1:{
    fontWeight:'bold',
    fontSize:20,
    alignSelf:'center',
    color:'#FB6F6F'
  },
  h2:{
    fontWeight:'bold',
    fontSize:15,
  },
  h3:{
    fontSize:16,
  },
  containerImg: {
    width: 100,
    height: 100,
    flex: 3,
    borderRadius: 30

  },
  packageImage: {
    top: -15,
    left: -10,
    position: "absolute",
    width: 110,
    height: 125,
    flex: 3,
    borderRadius: 20,
  },

  packagesItem: {
    minWidth: 360,
    width: '80%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})

export default Showroom;