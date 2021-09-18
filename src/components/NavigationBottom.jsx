// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react'; // Import "react" library's content for this component usage.
import { Link } from 'react-router-native'; // Import following components from "react-router-native" library's content for this component usage.
import { Text, StyleSheet, View, Pressable } from 'react-native'; // Import following components from "react-native" library for this component usage.

import { Feather, Ionicons, AntDesign } from '@expo/vector-icons'; // Import following components from "@expo/vector-icons" libary for this component usage.
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
      <Link to="/dashboard">
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? styling.colors.Asphalt
                : styling.colors.VistaWhite,
            },
            navigationContainer.pressableContainer
          ]}>
          {({ pressed }) => (
            <View>
              <Feather style={navigationContainer.iconContainer} name="home" size={20} color={ pressed ? styling.colors.VistaWhite : styling.colors.Asphalt } />
              <Text style={[{
                color: pressed
                  ? styling.colors.VistaWhite
                  : styling.colors.Asphalt,
                },
                navigationContainer.textContainer
              ]}>Home</Text>
            </View>
          )}
        </Pressable>
      </Link>
      <Link to="/dashboard/new-item">
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? styling.colors.Asphalt
                : styling.colors.VistaWhite,
            },
            navigationContainer.pressableContainer
          ]}>
          {({ pressed }) => (
            <View>
              <AntDesign style={navigationContainer.iconContainer} name="pluscircleo" size={20} color={ pressed ? styling.colors.VistaWhite : styling.colors.Asphalt } />
              <Text style={[{
                color: pressed
                  ? styling.colors.VistaWhite
                  : styling.colors.Asphalt
                },
                navigationContainer.textContainer
              ]}>New item</Text>
            </View>
          )}
        </Pressable>
      </Link>
      <Link to="/dashboard">
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? styling.colors.Asphalt
                : styling.colors.VistaWhite,
            },
            navigationContainer.pressableContainer
          ]}>
          {({ pressed }) => (
            <View>
              <AntDesign style={navigationContainer.iconContainer} name="profile" size={20} color={ pressed ? styling.colors.VistaWhite : styling.colors.Asphalt } />
              <Text style={[{
                color: pressed
                  ? styling.colors.VistaWhite
                  : styling.colors.Asphalt,
                },
                navigationContainer.textContainer
              ]}>Profile</Text>
            </View>
          )}
        </Pressable>
      </Link>
    </View>
  );
};

// Export "NavigationBottom" component, so other components like "App.js" are able to use this hooks's content.
export default NavigationBottom;
