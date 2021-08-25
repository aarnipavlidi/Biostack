// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { View, StyleSheet } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Appbar } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.

import styling from '../styling'; // Import "styling" variable from "styling.js" for this component usage.

const dashboardHeaderContainer = StyleSheet.create({
  appBarContainer: {
    backgroundColor: styling.colors.Asphalt,
    height: 50
  },
  appBarContent: {
    color: styling.colors.VistaWhite,
  },
});

// Define "DashboardHeader" component, which will execute everything inside of {...}.
const DashboardHeader = () => {

  const handleSearch = () => console.log("Searching");

  // Component will render everything inside of (...) back to the user.
  return (
    <Appbar.Header style={dashboardHeaderContainer.appBarContainer} statusBarHeight={0}>
      <Appbar.Content style={dashboardHeaderContainer.appBarContent} title="Biostack" />
      <Appbar.Action icon="magnify" onPress={handleSearch} />
    </Appbar.Header>
  );
};

// Export "DashboardHeader" component, so other components like "App.js" are able to use this hooks's content.
export default DashboardHeader;
