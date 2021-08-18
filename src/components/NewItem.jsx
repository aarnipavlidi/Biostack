// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { Text, StyleSheet, View } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Appbar } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.
import { useHistory } from 'react-router-native'; // Import following functions from "react-router-native" library's content for this component usage.

import styling from '../styling'; // Import "styling" variable from "styling.js" for this component usage.

const newItemContainer = StyleSheet.create({
  mainContainer: {
    backgroundColor: styling.colors.VistaWhite,
    flexGrow: 1,
  },
  appBarContainer: {
    backgroundColor: styling.colors.Asphalt,
  },
  appBarContent: {
    color: styling.colors.VistaWhite
  }
});

const NewItem = () => {

  const history = useHistory(); // Define "history" variable, which will execute => "useHistory(...)" function.

  // Define "goBackPreviousRoute" variable, which will execute everything inside
  // of {...}. When app will render this component, user can choose to go back
  // previous route where user was. If for example user came from "Home", then
  // this function will redirect user to => "/dashboard" path when referenced.
  const goBackPreviousRoute = () => {
    history.goBack();
  };

  const handleMore = () => console.log("Show more settings from this component!");

  // Component will render everything inside of (...) back to the user.
  return (
    <View style={newItemContainer.mainContainer}>
      <Appbar.Header statusBarHeight={0} style={newItemContainer.appBarContainer}>
        <Appbar.BackAction onPress={goBackPreviousRoute} />
        <Appbar.Content titleStyle={newItemContainer.appBarContent} title="Add new item to the app" subtitle="Please fill all the required fields." subtitleStyle={newItemContainer.appBarContent} />
        <Appbar.Action icon="dots-vertical" onPress={handleMore} />
      </Appbar.Header>
    </View>
  );
};

// Export "NewItem" component, so other components like "App.js" are able to use this hooks's content.
export default NewItem;
