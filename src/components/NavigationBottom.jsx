// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { Link } from 'react-router-native'; // Import following components from "react-router-native" library's content for this component usage.
import { Text, StyleSheet, View, Pressable, TouchableOpacity } from 'react-native'; // Import following components from "react-native" library for this component usage.

import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import following components from "@expo/vector-icons" libary for this component usage.
import styling from '../styling'; // Import "styling" variable from "styling.js" for this component usage.

// Define "navigationContainer" variable, which will be used for styling
// whole container, where inside is different navigation links.
const navigationContainer = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: styling.colors.VistaWhite,
    borderColor: styling.colors.Asphalt,
    borderTopWidth: 3,
    height: 50,
    position: 'absolute',
    bottom: 0,
  },
  pressableContainer: {
    height: '100%',
    paddingTop: 2,
    flexDirection: 'column',
  },
  iconContainer: {
    textAlign: 'center'
  },
  textContainer: {
    fontFamily: styling.fonts.android,
    fontWeight: styling.fontWeights.normal,
    fontSize: styling.fontSizes.default,
    paddingLeft: 10,
    paddingRight: 10
  }
});

// Define "NavigationBottom" component, which will execute everything inside of {...}
// and render different links, where user can choose which component will be rendered.
const NavigationBottom = () => {

  // Component will render everything inside of (...) back to the user.
  return (
    <View style={navigationContainer.container}>
      <Pressable style={navigationContainer.pressableContainer}>
        <Link to="/dashboard" component={TouchableOpacity}>
          <MaterialCommunityIcons style={navigationContainer.iconContainer} name="home-circle-outline" size={22} color={styling.colors.Asphalt} />
          <Text style={navigationContainer.textContainer}>Home</Text>
        </Link>
      </Pressable>
      <Pressable style={navigationContainer.pressableContainer}>
        <Link to="/dashboard/new-item" component={TouchableOpacity}>
          <MaterialCommunityIcons style={navigationContainer.iconContainer} name="plus-circle-outline" size={22} color={styling.colors.Asphalt} />
          <Text style={navigationContainer.textContainer}>New item</Text>
        </Link>
      </Pressable>
      <Pressable style={navigationContainer.pressableContainer}>
        <Link to="/dashboard/profile" component={TouchableOpacity}>
          <MaterialCommunityIcons style={navigationContainer.iconContainer} name="account-settings-outline" size={22} color={styling.colors.Asphalt} />
          <Text style={navigationContainer.textContainer}>Profile</Text>
        </Link>
      </Pressable>
    </View>
  );
};

// Export "NavigationBottom" component, so other components like "App.js" are able to use this hooks's content.
export default NavigationBottom;
