import React, {useState,useEffect} from "react";
import { StyleSheet,View,Text,Image ,TouchableOpacity} from "react-native";
import Icon from "react-native-dynamic-vector-icons";


function StyleItem({ item, onSelectedStyle,onRemoveStyle,disabled}) {

    const [choose,setChoose] = useState(false);

    const handleChoose = () => {
        if(!choose){
        onSelectedStyle(item.id,item.imageUrl)
        }else{
            onRemoveStyle(item.id,item.imageUrl)
        }
        setChoose(!choose)
    }

    useEffect(() => {
        setChoose(false);
    },[])
    
    return (
        <TouchableOpacity onPress={handleChoose} disabled={disabled}>
            <View>
        <View style={[styles.container,{opacity: choose ? 0.3 : 1}]}>
        <View style={{flex:2}}>
            <Image source = {item.imageUrl ? { uri: item.imageUrl } : require("../assets/style_11.jpg")}
            style={{flex: 1, width: null, height: null, resizeMode: 'cover',borderRadius:10}}>
            </Image>
        </View>
        <View style={{ flex: 1, paddingLeft: 10, paddingTop: 5,bottom:-10 }}>
                <Text style={{alignSelf:'center'}}>{item.name?item.name:"style"}</Text>
        </View>
        </View>
            {choose && <Icon name="checkcircle" 
                type="AntDesign" 
                style={styles.icon}/>}
        </View>
        </TouchableOpacity>
    )
    
}

const styles = StyleSheet.create({
    container: {
        height:120,
        width:100,
        marginLeft:20,
        borderWidth: 0.5,
        borderColor: '#dddddd',
        borderRadius:10,
    },
    icon:{
        position:"absolute",
        alignSelf:"center",
        bottom:"50%",
        left:"50%"
    }
})

export default StyleItem