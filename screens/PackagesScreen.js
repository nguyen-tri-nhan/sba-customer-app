import React from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import DataLoader from '../model/Dataloader';
import { ENTITY } from '../utils/Constants';
import { useStyle } from '../utils/style';

function PackagesScreen({navigation, route}) {

  const { jwt } = route.params;


  const renderData = (data) => {
    console.log('jwt', jwt)
    console.log(data);
  }

  const styles = useStyle();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Packages</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      <DataLoader jwt={jwt} entity={ENTITY.PACKAGE} renderData={renderData} getAll/>
    </View>
  );
}

export default PackagesScreen;