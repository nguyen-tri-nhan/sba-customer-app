import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Avatar, Card, Paragraph, Title } from 'react-native-paper';
import { useStyle } from '../utils/style';
import { Text } from './Themed';

function PackageService({ pkg, navigation }) {

  const styles = useStyle();

  const onPkgPress = (id) => {
    console.log('press', id)
  }

  return (
    <TouchableOpacity onPress={() => onPkgPress(pkg.id)}>
      <Card style={styles.packagesItem}>
        <Card.Content>
          <Title>{pkg.name}</Title>
          <Paragraph>{pkg.description}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

export default PackageService;