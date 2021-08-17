// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

import styling from '../styling';

const styles = StyleSheet.create({
  container: {
    backgroundColor: styling.colors.VistaWhite,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const Dashboard = () => {

  return (
    <View style={styles.container}>
      <Text>This is Dashboard component.</Text>
    </View>
  );

};

export default Dashboard;
