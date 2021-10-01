// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react'; // Import "react" library's content for this component usage.
import { Switch, Route, Redirect } from 'react-router-native'; // Import following components from "react-router-native" library's content for this component usage.
import { SafeAreaView, StatusBar, Platform, StyleSheet, View, useWindowDimensions } from 'react-native'; // Import following components from "react-native" library for this component usage.

import LoginScreen from './LoginScreen'; // Import "LoginScreen" component from "LoginScreen.jsx" file for this component usage.
import RegistrationScreen from './RegistrationScreen'; // Import "RegistrationScreen" component from "RegistrationScreen.jsx" file for this component usage.
import Dashboard from './Home/Dashboard'; // Import "Dashboard" component from "Dashboard.jsx" file for this component usage.
import CurrentProduct from './ProductByID/CurrentProduct'; // Import "CurrentProduct" component from "CurrentProduct.jsx" file for this component usage.
import OrderConfirmation from './ProductByID/OrderConfirmation'; // Import "OrderConfirmation" component from "OrderConfirmation.jsx" file for this component usage.
import NewProduct from './NewItem/NewProduct'; // Import "NewProduct" component from "NewProduct.jsx" file for this component usage.
import OrderHistory from './Profile/Transactions/OrderHistory'; // Import "OrderHistory" component from "OrderHistory.jsx" file for this component usage.
import CurrentTransaction from './Profile/Transactions/CurrentTransaction'; // Import "CurrentTransaction" component from "CurrentTransaction.jsx" file for this component usage.
import EditAccount from './Profile/Account/EditAccount'; // Import "EditAccount" component from "EditAccount.jsx" file for this component usage.
import UserSettings from './Profile/Clothes/UserSettings'; // Import "UserSettings" component from "UserSettings.jsx" file for this component usage.
import UserClothes from './Profile/Clothes/UserClothes'; // Import "UserClothes" component from "UserClothes.jsx" file for this component usage.
import NavigationBottom from './NavigationBottom'; // Import "NavigationBottom" component from "NavigationBottom.jsx" file for this component usage.

import BackgroundAnimation from './Background/AnimatedBackground'; // Import "BackgroundAnimation" component from "AnimatedBackground.jsx" for this component usage.
import SnackBarAlert from './Alert/SnackBarAlert.jsx'; // Import "SnackBarAlert" component from "SnackBarAlert.jsx" for this component usage.

import useCurrentUser from '../hooks/useCurrentUser'; // Import "useCurrentUser" hook from "useCurrentUser.js" file for this component usage.
import useProductFilter from '../hooks/useProductFilter'; // Import "useProductFilter" hook from "useProductFilter.js" file for this component usage.
import useSnackBar from '../hooks/useSnackBar'; // Import "useSnackBar" hook from "useSnackBar.js" file for this component usage.

import AppLoading from 'expo-app-loading'; // Import "AppLoading" component from "expo-app-loading" libary for thos component usage.
import styling from '../styling'; // Import "styling" variable from "styling.js" for this component usage.
import { useFonts, PermanentMarker_400Regular } from '@expo-google-fonts/permanent-marker';
import { AnnieUseYourTelescope_400Regular } from '@expo-google-fonts/annie-use-your-telescope';
import { Merienda_400Regular, Merienda_700Bold } from '@expo-google-fonts/merienda';
import { IndieFlower_400Regular } from '@expo-google-fonts/indie-flower';

// Define "mainContainer" variable, which will style whole "Main" component,
// which means it does not matter which component is being rendered back to
// the user, this style is basically always active. We are just making sure
// that components which are being rendered back to the user are always under
// of phones "StatusBar" (where are battery icons etc.) container.
const mainContainer = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 50 : 0,
    bottom: 50,
    backgroundColor: styling.colors.VistaWhite,
  },
});

// Define "Main" component, which will execute everything inside of {...}, this component
// purpose is to render on specific user route => specific component back to the user.
// If for example user is not authenticated ("currentToken" is => "null"), then user will
// be redirected back to the login screen => "LoginScreen" component => path "/".
const Main = () => {

  const windowHeight = useWindowDimensions().height;

  const [fontsLoaded] = useFonts({
    PermanentMarker_400Regular,
    AnnieUseYourTelescope_400Regular,
    Merienda_400Regular,
    Merienda_700Bold,
    IndieFlower_400Regular
  });

  const [currentToken, setCurrentToken] = useState(null); // Define "currentToken" variable into state, which will get default value of "null".
  const { currentUserData, loading } = useCurrentUser(); // Define "currentUserData" and "loading" variables from => "useCurrentUser(...)" hook.

  const { searchStatus, activateSearchBar, resetSearchBar, currentSearchValue, setCurrentSearchValue, debouncedSearchValue } = useProductFilter();
  const { snackBarStatus, snackBarMessage, showSnackBar, removeSnackBar } = useSnackBar();

  if (!fontsLoaded) {
    return <AppLoading />;
  };

  // Component will render everything inside of (...) back to the user.
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: styling.colors.VistaWhite, minHeight: Math.round(windowHeight) }}>
      <View style={mainContainer.container}>
        <Switch>
          <Route exact path="/dashboard">
            {currentToken ? <Dashboard searchStatus={searchStatus} resetSearchBar={resetSearchBar} activateSearchBar={activateSearchBar} currentSearchValue={currentSearchValue} setCurrentSearchValue={setCurrentSearchValue} debouncedSearchValue={debouncedSearchValue} /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/dashboard/new-item">
            {currentToken ? <NewProduct currentUserData={currentUserData} /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/dashboard/order-confirmation">
            {currentToken ? <OrderConfirmation /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/dashboard/profile/edit-account">
            {currentToken ? <EditAccount setCurrentToken={setCurrentToken} currentUserData={currentUserData} loading={loading} showSnackBar={showSnackBar}  /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/dashboard/profile/transactions">
            {currentToken ? <OrderHistory currentUserData={currentUserData} loading={loading} /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/dashboard/profile/transactions/:transactionID">
            {currentToken ? <CurrentTransaction currentUserData={currentUserData} loading={loading} /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/dashboard/profile/clothes">
            {currentToken ? <UserClothes currentUserData={currentUserData} loading={loading} /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/dashboard/profile">
            {currentToken ? <UserSettings setCurrentToken={setCurrentToken} currentUserData={currentUserData} loading={loading} /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/dashboard/:id">
            {currentToken ? <CurrentProduct currentUserData={currentUserData} loadingUserData={loading} /> : <Redirect to="/" />}
          </Route>
          <Route exact path='/register'>
            <RegistrationScreen showSnackBar={showSnackBar} />
          </Route>
          <Route exact path="/">
            <LoginScreen setCurrentToken={setCurrentToken} />
          </Route>
        </Switch>
        {currentToken ? null : <BackgroundAnimation />}
        <SnackBarAlert snackBarStatus={snackBarStatus} snackBarMessage={snackBarMessage} removeSnackBar={removeSnackBar} />
      </View>
      {currentToken ? <NavigationBottom /> : null}
    </SafeAreaView>
  );
};

// Export "Main" component, so other components like "App.js" are able to use this hooks's content.
export default Main;
