// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { Alert, ActivityIndicator, FlatList, View, StyleSheet } from 'react-native'; // Import following components from "react-native" library for this component usage.

import UserSettingsHeader from './UserSettingsHeader';
import UserListedProducts from './UserListedProducts';

import { useApolloClient } from '@apollo/client'; // Import following functions from "@apollo/client" libary for this component usage.

import useDeleteUser from '../hooks/useDeleteUser'; // Import "useDeleteUser" hook from "useDeleteUser.js" file for this component usage.
import useAuthStorage from '../hooks/useAuthStorage'; // Import "useAuthStorage" hook from "useAuthStorage.js" file for this component usage.

import styling from '../styling'; // Import "styling" variable from "styling.js" for this component usage.

// Define "loadingContainer" variable, which will be used to create style
// if data is "loading" we will return => "loading spinner".
const loadingContainer = StyleSheet.create({
  container: {
    backgroundColor: styling.colors.VistaWhite,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

// Define "UserSettings" component, which will execute everything inside of {...}
// and render back either "loading spinner" or current logged user data.
const UserSettings = ({ setCurrentToken, currentUserData, loading }) => {

  const [deleteUserFromDatabase] = useDeleteUser(); // Define "deleteUserFromDatabase" variable from => "useDeleteUser(...)" hook.

  const client = useApolloClient(); // Define "client" variable, which is equal to "useApolloClient(...)" function.
  const authStorage = useAuthStorage(); // Define "authStorage" variable, which is equal to "useAuthStorage(...)" function.

  // Define "removeUserToken" function, which will execute everything inside of {...},
  // so if user wants to delete his account and confirms deletion via "Alert" method,
  // then this function will be executed. If account deletion is successful, then
  // user will be redirected back to login screen and else if there is a problem
  // with deletion then "error.message" variable will be returned back to the user.
  const removeUserToken = async () => {
    try { // First we will execute "try" section, if there will be a problem => "catch" section.
      await deleteUserFromDatabase(currentUserData._id);
      await authStorage.removeAccessToken(); // Remove token value from "authStorage" after account deletion.
      //client.resetStore(); // Clear mutation from "active" and refetch all other active queries again.
      // App was getting errors after account deletion and changing "resetStore()" into
      // "clearStore()" function solved the issue. Need to find out later what caused
      // the original problem when deleting account and going back to login screen.
      client.clearStore(); // Does same thing as upper function "client.resetStore()", but won't refetch all other active queries again.
      setCurrentToken(null); // Change "currentToken" variable state into original value => "null".
    } catch (error) {
      console.log(error.message); // Console.log "erro.message" variable data back to the user.
    }
  };

  // Define "confirmUserDelete" function, which will execute everything inside of
  // {...}, so if user presses button to delete his/her account => "Alert" component
  // will be rendered back to the user and user has to confirm that he/she wants to
  // delete account from database. If user chooses to confirm, then "removeUserToken()"
  // function will be executed and app will try delete account from the database.
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

  const getUserListedProducts = currentUserData
    ? currentUserData.products.map(results => results)
    : [];

  // If "me" querys data => "currentUserData" is still loading from the dabase, component
  // will render everything inside of (...) (loading spinner) untill data has loaded.
  if (loading) {
    return (
      <View style={loadingContainer.container}>
        <ActivityIndicator size="large" color={styling.colors.Asphalt} />
      </View>
    );
  };

  // Otherwise component will render everything inside of (...) back to the user.
  return (
    <FlatList
      data={getUserListedProducts}
      keyExtractor={(item, index) => item._id}
      renderItem={({ item }) => <UserListedProducts item={item} />}
      ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
      ListHeaderComponent={<UserSettingsHeader currentUserData={currentUserData} confirmUserDelete={confirmUserDelete} />}
    />
  );
};

// Export "UserSettings" component, so other components like "App.js" are able to use this hooks's content.
export default UserSettings;
