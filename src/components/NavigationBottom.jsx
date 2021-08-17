// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react';
import { Link } from 'react-router-native';
import { Text, StyleSheet, View, Pressable } from 'react-native';

import { Ionicons, AntDesign } from '@expo/vector-icons';

import styling from '../styling';

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

const NavigationBottom = () => {

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

export default NavigationBottom;
