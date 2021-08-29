// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { useHistory } from 'react-router-native'; // Import following functions from "react-router-native" library's content for this component usage.
import { View, StyleSheet } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Appbar } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.

import styling from '../../styling'; // Import "styling" variable from "styling.js" for this component usage.

const clothesHeaderContainer = StyleSheet.create({
  appBarContainer: {
    backgroundColor: styling.colors.Asphalt,
    height: 50,
  },
  appBarContent: {
    color: styling.colors.VistaWhite
  }
});

const UserClothesHeader = () => {

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
    <View>
      <Appbar.Header statusBarHeight={0} style={clothesHeaderContainer.appBarContainer}>
        <Appbar.BackAction onPress={goBackPreviousRoute} />
        <Appbar.Content titleStyle={clothesHeaderContainer.appBarContent} title="Clothes" />
        <Appbar.Action icon="dots-vertical" onPress={handleMore} />
      </Appbar.Header>
    </View>
  );
};

// Export "UserClothesHeader" component, so other components like "App.js" are able to use this hooks's content.
export default UserClothesHeader;
