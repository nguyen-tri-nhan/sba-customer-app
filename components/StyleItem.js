import React, {Component} from "react";
import { StyleSheet,View,Text,Image } from "react-native";


class StyleItem extends Component {
    render() {
        return (
            <View style={styles.container}>
            <View style={{flex:2}}>
                <Image source = {require("../assets/style_11.jpg")}
                style={{flex: 1, width: null, height: null, resizeMode: 'cover'}}>
                </Image>
            </View>
            <View style={{ flex: 1, paddingLeft: 10, paddingTop: 5 }}>
                    <Text style={{alignSelf:'center'}}>Style 1</Text>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height:120,
        width:100,
        marginLeft:20,
        borderWidth: 0.5,
        borderColor: '#dddddd',
        borderRadius:10
    }
})

export default StyleItem