// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react'; // Import "react" library's content for this component usage.
import { Link } from 'react-router-native'; // Import following components from "react-router-native" library's content for this component usage.
import { Text, StyleSheet, View, Pressable } from 'react-native'; // Import following components from "react-native" library for this component usage.

import { Ionicons, AntDesign } from '@expo/vector-icons'; // Import following components from "@expo/vector-icons" libary for this component usage.
import styling from '../styling'; // Import "styling" variable from "styling.js" for this component usage.

// Define "navigationContainer" variable, which will be used for styling
// whole container, where inside is different navigation links.
const navigationContainer = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: styling.colors.VistaWhite,
    borderColor: styling.colors.Asphalt,
    borderTopWidth: 2,
    height: 50,
    position: 'absolute',
    bottom: 0,
  },
  pressableContainer: {
    flexDirection: 'column'
  },
  iconContainer: {
    textAlign: 'center'
  },
  textContainer: {
    color: styling.colors.Asphalt,
    fontFamily: styling.fonts.android,
    fontWeight: styling.fontWeights.normal,
    fontSize: styling.fontSizes.default,
  }
});

// Define "NavigationBottom" component, which will execute everything inside of {...}
// and render different links, where user can choose which component will be rendered.
const NavigationBottom = () => {

  // Component will render everything inside of (...) back to the user.
  return (
    <View style={navigationContainer.container}>
      <Pressable style={navigationContainer.pressableContainer}>
        <Link to="/dashboard">
          <View>
            <Ionicons style={navigationContainer.iconContainer} name="home" size={20} color={styling.colors.Asphalt} />
            <Text style={navigationContainer.textContainer}>Home</Text>
          </View>
        </Link>
      </Pressable>
      <Pressable style={navigationContainer.pressableContainer}>
        <Link to="/dashboard/profile">
          <View>
            <AntDesign style={navigationContainer.iconContainer} name="profile" size={20} color={styling.colors.Asphalt} />
            <Text style={navigationContainer.textContainer}>Profile</Text>
          </View>
        </Link>
      </Pressable>
    </View>
  );
};

// Export "NavigationBottom" component, so other components like "App.js" are able to use this hooks's content.
export default NavigationBottom;
