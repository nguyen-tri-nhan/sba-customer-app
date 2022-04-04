import React from 'react';
import { Image, ScrollView, View } from 'react-native';

function PreviewResultScreen(props) {
  const { navigation, route } = props;
  const { params } = route;
  const { links } = params;

  const renderLinks = () => {
    return links.map((link) => {
      <Image source={link} />
    });
  }

  return (
    <View>
      <ScrollView>
        {links ?
          renderLinks() :
          (<Image source={require("../assets/style_14.jpg")} />)}
      </ScrollView>
    </View>
  );
}

export default PreviewResultScreen;