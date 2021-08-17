// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react';
import { Alert, Pressable, ActivityIndicator, Text, StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

import { useApolloClient } from '@apollo/client';

import useDeleteUser from '../hooks/useDeleteUser';
import useAuthStorage from '../hooks/useAuthStorage';

import styling from '../styling';

const loadingContainer = StyleSheet.create({
  container: {
    backgroundColor: styling.colors.VistaWhite,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const buttonContainer = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContent: {
    marginTop: 15,
    width: '75%',
    height: 40,
    backgroundColor: styling.colors.Asphalt,
    borderWidth: 3,
    borderColor: styling.colors.Asphalt,
  },
  buttonContentText: {
    marginTop: 5,
    textAlign: 'center',
    color: styling.colors.VistaWhite
  },
});

const UserSettings = ({ setCurrentToken, currentUserData, loading }) => {

  const [deleteUserFromDatabase] = useDeleteUser();

  const authStorage = useAuthStorage();
  const client = useApolloClient();

  const removeUserToken = async () => {
    try {
      await deleteUserFromDatabase(currentUserData.id);
      await authStorage.removeAccessToken();
      client.resetStore();
      setCurrentToken(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  const confirmUserDelete = () => {
    Alert.alert(
      "Biostack",
      "Are you sure you want to delete your account from the app?",
      [
        {
          text: "CANCEL",
          onPress: () => console.log('User has cancelled account deletion process!'),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => removeUserToken(),
        }
      ]
    )
  };

  if (loading) {
    return (
      <View style={loadingContainer.container}>
        <ActivityIndicator size="large" color={styling.colors.Asphalt} />
      </View>
    );
  };

  return (
    <View>
      <Card>
        <Card.Content>
          <Title>Your account information:</Title>
          <Paragraph>Username: {currentUserData.username}</Paragraph>
          <Paragraph>Name: {currentUserData.name}</Paragraph>
          <Paragraph>Email: {currentUserData.email}</Paragraph>
        </Card.Content>
      </Card>
      <View style={buttonContainer.container}>
        <Pressable style={buttonContainer.buttonContent} onPress={confirmUserDelete}>
          <Text style={buttonContainer.buttonContentText}>Delete your account.</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default UserSettings;
