import React from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import DataLoader from '../model/Dataloader';
import { ENTITY, STATUS } from '../utils/Constants';
import { isEmpty } from 'lodash';
import { useStyle } from '../utils/style';
import PackageService from '../components/PackageService';
import { SafeAreaView, ScrollView } from 'react-native';

function PackagesScreen({ navigation, route }) {

  const { jwt } = route.params;


  const renderData = (data) => {
    if (!isEmpty(data)) {
      return data.map((item) => (<PackageService key={item.id} pkg={item} navigation={navigation} />))
    }
  }

  const styles = useStyle();

  return (
    <SafeAreaView style={styles.listItem}>
      <ScrollView>
        <DataLoader jwt={jwt} entity={ENTITY.PACKAGE} renderData={renderData} getAll initialStatus={STATUS.ENABLE} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default PackagesScreen;