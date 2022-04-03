import React from 'react';
import { Image, View } from 'react-native';

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
      {links ?
        renderLinks() :
        (<Image source={require("../assets/style_14.jpg")} />)}
    </View>
  );
}

export default PreviewResultScreen;