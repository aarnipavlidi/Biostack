// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react'; // Import "react" library's content for this component usage.
import { Switch, Route, Redirect } from 'react-router-native'; // Import following components from "react-router-native" library's content for this component usage.
import { SafeAreaView, StatusBar, Platform, StyleSheet, View } from 'react-native'; // Import following components from "react-native" library for this component usage.

import LoginScreen from './LoginScreen'; // Import "LoginScreen" component from "LoginScreen.jsx" file for this component usage.
import RegistrationScreen from './RegistrationScreen'; // Import "RegistrationScreen" component from "RegistrationScreen.jsx" file for this component usage.
import Dashboard from './Dashboard'; // Import "Dashboard" component from "Dashboard.jsx" file for this component usage.
import CurrentProduct from './CurrentProduct'; // Import "CurrentProduct" component from "CurrentProduct.jsx" file for this component usage.
import NewProduct from './NewProduct'; // Import "NewProduct" component from "NewProduct.jsx" file for this component usage.
import UserSettings from './UserSettings'; // Import "UserSettings" component from "UserSettings.jsx" file for this component usage.
import NavigationBottom from './NavigationBottom'; // Import "NavigationBottom" component from "NavigationBottom.jsx" file for this component usage.

import useCurrentUser from '../hooks/useCurrentUser'; // Import "useCurrentUser" hook from "useCurrentUser.js" file for this component usage.

import styling from '../styling'; // Import "styling" variable from "styling.js" for this component usage.

// Define "mainContainer" variable, which will style whole "Main" component,
// which means it does not matter which component is being rendered back to
// the user, this style is basically always active. We are just making sure
// that components which are being rendered back to the user are always under
// of phones "StatusBar" (where are battery icons etc.) container.
const mainContainer = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 50 : 0,
    bottom: 50,
    backgroundColor: styling.colors.VistaWhite,
  }
});

// Define "Main" component, which will execute everything inside of {...}, this component
// purpose is to render on specific user route => specific component back to the user.
// If for example user is not authenticated ("currentToken" is => "null"), then user will
// be redirected back to the login screen => "LoginScreen" component => path "/".
const Main = () => {

  const [currentToken, setCurrentToken] = useState(null); // Define "currentToken" variable into state, which will get default value of "null".
  const { currentUserData, loading } = useCurrentUser(); // Define "currentUserData" and "loading" variables from => "useCurrentUser(...)" hook.

  // Component will render everything inside of (...) back to the user.
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: styling.colors.VistaWhite}}>
      <View style={mainContainer.container}>
        <Switch>
          <Route exact path="/dashboard">
            {currentToken ? <Dashboard /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/dashboard/new-item">
            {currentToken ? <NewProduct currentUserData={currentUserData} /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/dashboard/profile">
            {currentToken ? <UserSettings setCurrentToken={setCurrentToken} currentUserData={currentUserData} loading={loading} /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/dashboard/:id">
            {currentToken ? <CurrentProduct /> : <Redirect to="/" />}
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

// Export "Main" component, so other components like "App.js" are able to use this hooks's content.
export default Main;
