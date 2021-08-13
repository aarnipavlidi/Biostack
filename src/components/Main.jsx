// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-native';
import Constants from 'expo-constants';
import { Pressable, Text, StyleSheet, View } from 'react-native';

import LoginScreen from './LoginScreen';
import useAuthStorage from '../hooks/useAuthStorage';

import { useQuery } from '@apollo/client'
import { CURRENT_LOGGED_USER } from '../graphql/queries';

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 50,
    backgroundColor: '#Fdfcfa',
    flexGrow: 1,
    flexShrink: 1,
  }
});


const Main = () => {

  const [currentToken, setCurrentToken] = useState(null);
  console.log(currentToken);

  const authStorage = useAuthStorage();

  //const testi = authStorage.getAccessToken();

  const aarni = async () => {
    const testi = await authStorage.removeAccessToken();
    setCurrentToken(null);
  };

  if (currentToken === null) {
    return (
      <View style={styles.mainContainer}>
        <LoginScreen setCurrentToken={setCurrentToken} />
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Pressable onPress={() => aarni()}>
        <Text>testi et poistuuko token</Text>
      </Pressable>
    </View>
  );

};

export default Main;
