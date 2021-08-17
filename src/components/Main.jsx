// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-native';
import Constants from 'expo-constants';
import { Pressable, Text, StyleSheet, View } from 'react-native';

import LoginScreen from './LoginScreen';
import RegistrationScreen from './RegistrationScreen';
import Dashboard from './Dashboard';

const Main = () => {

  const [currentToken, setCurrentToken] = useState(null);

  return (
    <Switch>
      <Route exact path="/dashboard">
        {currentToken ? <Dashboard setCurrentToken={setCurrentToken} /> : <Redirect to="/" />}
      </Route>
      <Route exact path='/register'>
        <RegistrationScreen />
      </Route>
      <Route exact path="/">
        <LoginScreen setCurrentToken={setCurrentToken} />
      </Route>
    </Switch>
  );
};

export default Main;
