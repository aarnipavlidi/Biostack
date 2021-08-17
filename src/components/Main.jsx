// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-native';
import { SafeAreaView, StatusBar, Platform, StyleSheet, View } from 'react-native';

import LoginScreen from './LoginScreen';
import RegistrationScreen from './RegistrationScreen';
import Dashboard from './Dashboard';
import UserSettings from './UserSettings';
import NavigationBottom from './NavigationBottom';

import useCurrentUser from '../hooks/useCurrentUser';

import styling from '../styling';

const mainContainer = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: styling.colors.VistaWhite,
  }
});

const Main = () => {

  const [currentToken, setCurrentToken] = useState(null);
  const { currentUserData, loading } = useCurrentUser();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: styling.colors.VistaWhite}}>
      <View style={mainContainer.container}>
        <Switch>
          <Route exact path="/dashboard/profile">
            {currentToken ? <UserSettings setCurrentToken={setCurrentToken} currentUserData={currentUserData} loading={loading} /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/dashboard">
            {currentToken ? <Dashboard /> : <Redirect to="/" />}
          </Route>
          <Route exact path='/register'>
            <RegistrationScreen />
          </Route>
          <Route exact path="/">
            <LoginScreen setCurrentToken={setCurrentToken} />
          </Route>
        </Switch>
      </View>
        {currentToken ? <NavigationBottom /> : null}
    </SafeAreaView>
  );
};

export default Main;
