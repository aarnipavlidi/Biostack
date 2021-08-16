// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, StyleSheet, View } from 'react-native';

import styling from '../styling';

const styles = StyleSheet.create({
  container: {
    backgroundColor: styling.colors.VistaWhite,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const UserSettings = ({ currentUserData, loading }) => {

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={styling.colors.Asphalt} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>{currentUserData.id}</Text>
      <Text>{currentUserData.name}</Text>
      <Text>{currentUserData.username}</Text>
      <Text>{currentUserData.email}</Text>
    </View>
  );

};


export default UserSettings;
