import React from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import { useStyle } from '../utils/style';
import { Card } from 'react-native-paper';

function Showroom({ showroom, onSelectedShowroom }) {

  const styles = useStyle();

  const handlePress = () => {
    if (onSelectedShowroom) {
      onSelectedShowroom(showroom);
    }
  }

  console.log(showroom);
  return (
    
    <Card style={styleA.card}>
    <TouchableOpacity style={styles.packageContainer} onPress={handlePress}>
      <View style={[styles.packageInfomation
        // ,styleA.box,{backgroundColor:'#ECF9FC'}
      ]}>
        <View style={{backgroundColor:'#E7E7E7'}}>
          <Text style={[styleA.text,styleA.h1,{alignSelf:'center'}]}>{showroom.name}</Text>
        </View>
        <View
            style={{
              borderBottomColor: '#ECF9FC',
              borderBottomWidth: 1,
            }}
          />
        <Text style={[styleA.text,styleA.h2,{alignSelf:'flex-end'}]}>{showroom.address}</Text>
      <Text style={[styleA.text,styleA.h3]}>{showroom.description}</Text>
      </View>
    </TouchableOpacity>
     </Card>
  );
}

const styleA = StyleSheet.create({
  card:{
    flex: 9,
      backgroundColor:"#FFF",
      marginTop:20,
      marginLeft:20,
      marginRight:20
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
  }
})

export default Showroom;