// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { TextInput as NativeTextInput, View, Text, StyleSheet, Platform } from 'react-native'; // Import following components from "react-native" library for this component usage.

import styling from '../styling'; // Import "styling" variable from "styling.js" for this component usage.

const loginValidationStyling = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center'
  },
  contentNormal: {
    width: '91%',
    marginTop: 15,
    height: 40,
    borderBottomColor: styling.colors.Asphalt,
    borderBottomWidth: 2,
  },
  contentError: {
    width: '91%',
    marginTop: 15,
    height: 40,
    borderBottomColor: styling.colors.Asphalt,
    borderBottomWidth: 2,
  },
  contentErrorMessage: {
    width: '91%',
    marginTop: 5,
    fontFamily: styling.fonts.android,
    fontStyle: styling.fontStyles.italic,
    fontWeight: styling.fontWeights.bold,
    fontSize: styling.fontSizes.inputErrorText,
    color: styling.colors.ShimmeringBlush
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style];

  if (error) {
    return (
      <View style={loginValidationStyling.container}>
        <NativeTextInput style={loginValidationStyling.contentError} {...props} />
        <Text style={loginValidationStyling.contentErrorMessage}>{error}</Text>
      </View>
    );
  };

  return (
    <View style={loginValidationStyling.container}>
      <NativeTextInput style={loginValidationStyling.contentNormal} {...props} />
    </View>
  );
};

// Export "TextInput" component, so other components like "App.js" are able to use this hooks's content.
export default TextInput;
