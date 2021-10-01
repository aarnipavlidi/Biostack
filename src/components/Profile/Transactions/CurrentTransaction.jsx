// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react'; // Import "react" library's content for this component usage.
import { useHistory } from 'react-router-native'; // Import following components from "react-router-native" library's content for this component usage.
import { ActivityIndicator, StyleSheet, ScrollView, View, Text } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Appbar, Card } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.

import useCurrentTransaction from '../../../hooks/useCurrentTransaction'; // Import "useCurrentTransaction" hook from "useCurrentTransaction.js" file for this component usage.

import styling from '../../../styling'; // Import "styling" variable from "styling.js" for this component usage.

// Define "loadingContainer" variable, which will be used to create style
// if data is "loading" we will return => "loading spinner".
const loadingContainer = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
  },
});

const headerContainer = StyleSheet.create({
  appBarContainer: {
    backgroundColor: styling.colors.Asphalt,
    height: 50
  },
  appBarContent: {
    color: styling.colors.VistaWhite,
  },
});


const CurrentTransaction = ({ currentUserData, loading }) => {


  const { getCurrentTransaction, loadingTransaction } = useCurrentTransaction();

  const history = useHistory(); // Define "history" variable, which will execute => "useHistory(...)" function.

  // Define "goBackPreviousRoute" variable, which will execute everything inside
  // of {...}. When app will render this component, user can choose to go back
  // previous route where user was. If for example user came from "Home", then
  // this function will redirect user to => "/dashboard" path when referenced.
  const goBackPreviousRoute = () => {
    history.goBack();
  };

  // If data from the hook "useProducts(...)" is loading, then component
  // will render everything inside of (...) back to the user.
  if (loading || loadingTransaction) {
    return (
      <View style={loadingContainer.container}>
        <ActivityIndicator size="large" color={styling.colors.Asphalt} />
      </View>
    );
  };

  // Otherwise component will render everything inside of (...) back to the user.
  return (
    <ScrollView>
      <Appbar.Header style={headerContainer.appBarContainer} statusBarHeight={0}>
        <Appbar.BackAction onPress={goBackPreviousRoute} />
        <Appbar.Content style={headerContainer.appBarContent} title={getCurrentTransaction.productTitle} titleStyle={{ fontFamily: 'PermanentMarker_400Regular' }} />
      </Appbar.Header>
      <Text>{getCurrentTransaction.productID}</Text>
    </ScrollView>
  );
};

// Export "CurrentTransaction" component, so other components like "App.js" are able to use this hooks's content.
export default CurrentTransaction;
