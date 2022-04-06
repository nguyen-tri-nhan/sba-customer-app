import React,{useState} from 'react';
import { TouchableOpacity, Image, StyleSheet,View,Text } from 'react-native';
import Icon from "react-native-dynamic-vector-icons";

function StarFeedBack({ onSelectedStar}){
    
    const [color1,setColor1] = useState(false);
    const [color2,setColor2] = useState(false);
    const [color3,setColor3] = useState(false);
    const [color4,setColor4] = useState(false);
    const [color5,setColor5] = useState(false);
    const handlePress1 = () => {
        setColor1(true);
        setColor2(false);
        setColor3(false);
        setColor4(false);
        setColor5(false);
        onSelectedStar(1);
    }

    const handlePress2 = () => {
        setColor1(true);
        setColor2(true);
        setColor3(false);
        setColor4(false);
        setColor5(false);
        onSelectedStar(2);
    }

    const handlePress3 = () => {
        setColor1(true);
        setColor2(true);
        setColor3(true);
        setColor4(false);
        setColor5(false);
        onSelectedStar(3);
    }


    const handlePress4 = () => {
        setColor1(true);
        setColor2(true);
        setColor3(true);
        setColor4(true);
        setColor5(false);
        onSelectedStar(4);
    }

    const handlePress5 = () => {
        setColor1(true);
        setColor2(true);
        setColor3(true);
        setColor4(true);
        setColor5(true);
        onSelectedStar(5);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePress1}>
            <Icon
            name="star"
            type="AntDesign"
            size={30}
            color={(color1)?"#F7FC0D":"#BABABA"}
          />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handlePress2}>
          <Icon
            name="star"
            type="AntDesign"
            size={30}
            color={(color2)?"#F7FC0D":"#BABABA"}
          />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handlePress3}>
          <Icon
            name="star"
            type="AntDesign"
            size={30}
            color={(color3)?"#F7FC0D":"#BABABA"}
          />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handlePress4}>
          <Icon
            name="star"
            type="AntDesign"
            size={30}
            color={(color4)?"#F7FC0D":"#BABABA"}
          />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handlePress5}>
          <Icon
            name="star"
            type="AntDesign"
            size={30}
            color={(color5)?"#F7FC0D":"#BABABA"}
          />
          </TouchableOpacity>
        </View>
    );
}

const styles=StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginBottom:20
    }
});
export default StarFeedBack