// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState, useEffect } from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';

import styling from '../styling';

const styles = StyleSheet.create({
  container: {
    backgroundColor: styling.colors.VistaWhite,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const UserSettings = () => {

  return (
    <View style={styles.container}>
      <Text>This is UserSettings component.</Text>
    </View>
  );

};

export default UserSettings;
