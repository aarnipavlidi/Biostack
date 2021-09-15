// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { View, StyleSheet } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Appbar, Searchbar } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.
import { MaterialIcons } from '@expo/vector-icons'; // Import following components from "@expo/vector-icons" libary for this component usage.

import styling from '../../styling'; // Import "styling" variable from "styling.js" for this component usage.

const dashboardHeaderContainer = StyleSheet.create({
  appBarContainer: {
    backgroundColor: styling.colors.Asphalt,
    height: 50,
  },
  appBarContent: {
    color: styling.colors.VistaWhite,
  },
});

// Define "DashboardHeader" component, which will execute everything inside of {...}.
const DashboardHeader = ({ searchStatus, resetSearchBar, activateSearchBar, currentSearchValue, setCurrentSearchValue }) => {

  // Component will render everything inside of (...) back to the user.
  return (
    <Appbar.Header style={dashboardHeaderContainer.appBarContainer} statusBarHeight={0}>
      <Appbar.Content style={dashboardHeaderContainer.appBarContent} title="Biostack" titleStyle={{ fontFamily: 'PermanentMarker_400Regular' }} />
      {searchStatus === true
        ? <Searchbar style={{ height: 30, width: 80, marginRight: 5, flexGrow: 1 }} placeholder="Search for item" value={currentSearchValue} onChangeText={(getInputValue) => setCurrentSearchValue(getInputValue)} inputStyle={{ fontSize: 13 }} clearIcon={() => <MaterialIcons name="clear" size={24} onPress={() => resetSearchBar()} color={styling.colors.Asphalt} />}/>
        : <Appbar.Action icon="magnify" onPress={activateSearchBar} />
      }
    </Appbar.Header>
  );
};

// Export "DashboardHeader" component, so other components like "App.js" are able to use this hooks's content.
export default DashboardHeader;
