// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react'; // Import "react" library's content for this component usage.
import { useHistory } from 'react-router-native'; // Import following functions from "react-router-native" library's content for this component usage.
import { Alert, ActivityIndicator, ScrollView, View, StyleSheet, Text, Pressable } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Appbar, TextInput, Card, Avatar, IconButton, Button,} from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.
import { FontAwesome5 } from '@expo/vector-icons'; // Import following components from "@expo/vector-icons" libary for this component usage.

import { useApolloClient } from '@apollo/client'; // Import following functions from "@apollo/client" libary for this component usage.
import useDeleteUser from '../../../hooks/useDeleteUser'; // Import "useDeleteUser" hook from "useDeleteUser.js" file for this component usage.
import useDeleteManyProduct from '../../../hooks/useDeleteManyProduct'; // Import "useDeleteManyProduct" hook from "useDeleteManyProduct.js" file for this component usage.
import useAuthStorage from '../../../hooks/useAuthStorage'; // Import "useAuthStorage" hook from "useAuthStorage.js" file for this component usage.

import SelectedOption from './SelectedOption'; // Import "SelectedOption" component from "SelectedOption.jsx" file for this component usage.
import styling from '../../../styling'; // Import "styling" variable from "styling.js" for this component usage.

// Define "loadingContainer" variable, which will be used to create style
// if data is "loading" we will return => "loading spinner".
const loadingContainer = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styling.colors.VistaWhite,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const editAccountHeaderContainer = StyleSheet.create({
  appBarContainer: {
    backgroundColor: styling.colors.Asphalt,
    height: 50,
  },
  appBarContent: {
    color: styling.colors.VistaWhite
  }
});

const userInformationContainer = StyleSheet.create({
  title: {
    marginTop: 15,
    marginBottom: 10,
    width: '50%',
    backgroundColor: styling.colors.VistaWhite,
    alignSelf: 'center',
    elevation: 10,
  },
  titleContent: {
    fontFamily: styling.fonts.buttonContent,
    padding: 5,
    textAlign: 'center',
    color: styling.colors.Asphalt
  },
  newValueElement: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputElement: {
    flex: 0.8,
  },
  buttonElement: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});

const cardTitleContainer = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 3,
    backgroundColor: styling.colors.VistaWhite,
    width: '90%',
    alignSelf: 'center',
    elevation: 3
  },
});

const EditAccount = ({ setCurrentToken, currentUserData, loading }) => {

  const [deleteUserFromDatabase] = useDeleteUser(); // Define "deleteUserFromDatabase" variable from => "useDeleteUser(...)" hook.
  const [deleteProductsFromDatabase] = useDeleteManyProduct(); // Define "deleteProductsFromDatabase" variable from => "useDeleteManyProduct(...)" hook.
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
      console.log(error.message); // Console.log "error.message" variable data back to the user.
    }
  };

  const removeUserProducts = async () => {
    await deleteProductsFromDatabase();
  };

  const confirmProductDelete = () => {
    Alert.alert(
      "Biostack",
      "Are you sure you want to delete your listed items from the app?",
      [
        {
          text: "CANCEL",
          onPress: () => console.log('User has cancelled account deletion process!'),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => removeUserProducts(),
        }
      ]
    )
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

  const [nameValue, setNameValue] = useState({
    status: false,
    data: '',
  });

  const [emailValue, setEmailValue] = useState({
    status: false,
    data: '',
  });

  const history = useHistory(); // Define "history" variable, which will execute => "useHistory(...)" function.

  // Define "goBackPreviousRoute" variable, which will execute everything inside
  // of {...}. When app will render this component, user can choose to go back
  // previous route where user was. If for example user came from "Home", then
  // this function will redirect user to => "/dashboard" path when referenced.
  const goBackPreviousRoute = () => {
    history.goBack();
  };

  const resetAccountValues = () => {
    setNameValue({ status: false, data: '' });
    setEmailValue({ status: false, data: '' });
  };

  // If "me" querys data => "currentUserData" is still loading from the dabase, component
  // will render everything inside of (...) (loading spinner) untill data has loaded.
  if (loading) {
    return (
      <View style={loadingContainer.container}>
        <ActivityIndicator size="large" color={styling.colors.Asphalt} />
      </View>
    );
  };

  // Component will render everything inside of (...) back to the user.
  return (
    <ScrollView>
      <Appbar.Header statusBarHeight={0} style={editAccountHeaderContainer.appBarContainer}>
        <Appbar.BackAction onPress={goBackPreviousRoute} />
        <Appbar.Content titleStyle={editAccountHeaderContainer.appBarContent} title="Edit Account" titleStyle={{ fontFamily: 'PermanentMarker_400Regular' }} />
        <Appbar.Action icon="cards-heart" />
      </Appbar.Header>

      <View>


        <Card style={userInformationContainer.title}>
          <Text style={userInformationContainer.titleContent}>YOUR INFORMATION</Text>
        </Card>



        <View style={userInformationContainer.newValueElement}>
          <View style={userInformationContainer.inputElement}>
            <TextInput
              disabled={nameValue.status === false ? true : false}
              mode="flatline"
              label="Edit personal name."
              placeholder={currentUserData.name}
              value={nameValue.data}
              onChangeText={(result) => setNameValue({ data: result })}
              right={<TextInput.Affix text="/100" />}
              style={{ backgroundColor: styling.colors.VistaWhite }}
              theme={{colors: {primary: styling.colors.Asphalt}}}
              selectionColor={styling.colors.Asphalt}
            />
          </View>
          <SelectedOption accountValue={nameValue} setAccountValue={setNameValue} />
        </View>



        <View style={userInformationContainer.newValueElement}>
          <View style={userInformationContainer.inputElement}>
            <TextInput
              disabled={emailValue.status === false ? true : false}
              mode="flatline"
              label="Edit personal email."
              placeholder={currentUserData.email}
              value={emailValue.data}
              onChangeText={(result) => setEmailValue({ data: result })}
              right={<TextInput.Affix text="/100" />}
              style={{ backgroundColor: styling.colors.VistaWhite }}
              theme={{colors: {primary: styling.colors.Asphalt}}}
              selectionColor={styling.colors.Asphalt}
            />
          </View>
          <SelectedOption accountValue={emailValue} setAccountValue={setEmailValue} />
        </View>



        <View style={userInformationContainer.buttonElement}>
          <Button style={{ flex: 1/3 }} color={styling.colors.Asphalt} mode="contained" onPress={() => console.log('test')}>
            <Text style={{ fontFamily: styling.fonts.buttonContent }}>Confirm</Text>
          </Button>
          <Button style={{ flex: 1/3 }} color={styling.colors.Asphalt} mode="contained" onPress={resetAccountValues}>
            <Text style={{ fontFamily: styling.fonts.buttonContent }}>Cancel</Text>
          </Button>
        </View>

        <Card style={userInformationContainer.title}>
          <Text style={userInformationContainer.titleContent}>YOUR ACCOUNT</Text>
        </Card>

        <Card.Title
          style={cardTitleContainer.container}
          title="Delete account"
          subtitle="Delete your account from the app."
          left={(props) => <Avatar.Icon {...props} style={{ backgroundColor: styling.colors.Asphalt }} icon="account-box" />}
          right={(props) => <IconButton {...props} icon="delete-outline" onPress={confirmUserDelete} />}
        />

        <Card.Title
          style={cardTitleContainer.container}
          title="Delete products"
          subtitle="Delete your products from the app."
          left={(props) => <Avatar.Icon {...props} style={{ backgroundColor: styling.colors.Asphalt }} icon="basket-outline" />}
          right={(props) => <IconButton {...props} icon="delete-outline" onPress={confirmProductDelete}/>}
        />


      </View>
    </ScrollView>
  );
};

// Export "EditAccount" component, so other components like "App.js" are able to use this hooks's content.
export default EditAccount;
