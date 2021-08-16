// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react';
import { ActivityIndicator, Text, StyleSheet, View, SafeAreaView, StatusBar, Platform  } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

import styling from '../styling';

const styles = StyleSheet.create({
  container: {
    backgroundColor: styling.colors.VistaWhite,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const userSettingsContainer = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: styling.colors.VistaWhite,
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
      <SafeAreaView style={{ flex: 1, backgroundColor: styling.colors.VistaWhite }}>
        <View style={userSettingsContainer.container}>
          <Card>
            <Card.Content>
              <Title>Your account information:</Title>
              <Paragraph>Username: {currentUserData.username}</Paragraph>
              <Paragraph>Name: {currentUserData.name}</Paragraph>
              <Paragraph>Email: {currentUserData.email}</Paragraph>
            </Card.Content>
          </Card>
        </View>
      </SafeAreaView>
    );
  };

export default UserSettings;
