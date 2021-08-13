// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-native';
import Constants from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';

import LoginScreen from './LoginScreen';

import { useQuery } from '@apollo/client'
import { CURRENT_LOGGED_USER } from '../graphql/queries';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#Fdfcfa',
    flexGrow: 1,
    flexShrink: 1
  }
});


const Main = () => {

  const { data, loading, error } = useQuery(CURRENT_LOGGED_USER);

  if (!data) {
    return (
      <View style={styles.mainContainer}>
        <Route path="/" exact>
          <LoginScreen loading={loading} />
        </Route>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Text>Käyttäjä on nyt kirjautunut sisään?</Text>
      <Text>Käyttäjä on nyt kirjautunut sisään?</Text>
      <Text>Käyttäjä on nyt kirjautunut sisään?</Text>
      <Text>Käyttäjä on nyt kirjautunut sisään?</Text>
      <Text>Käyttäjä on nyt kirjautunut sisään?</Text>
      <Text>Käyttäjä on nyt kirjautunut sisään?</Text>
      <Text>Käyttäjä on nyt kirjautunut sisään?</Text>
    </View>
  );

};

export default Main;
