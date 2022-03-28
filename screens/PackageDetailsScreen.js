import React from 'react';
import { SafeAreaView } from 'react-native';
import { Text, View } from '../components/Themed';

function PackageDetailsScreen(props) {

  const { params } = props.route;

  return (

    <SafeAreaView>
      <Text>{params.pkg.name}</Text>
    </SafeAreaView>
  );
}

export default PackageDetailsScreen;