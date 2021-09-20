// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { View, StyleSheet, Text, Pressable } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Appbar, TextInput, Card } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.
import { FontAwesome } from '@expo/vector-icons'; // Import following components from "@expo/vector-icons" libary for this component usage.

import styling from '../../../styling'; // Import "styling" variable from "styling.js" for this component usage.

const SelectedOption = ({ accountValue, setAccountValue }) => {

  if (accountValue.status === false) {
    return (
      <Pressable onPress={() => setAccountValue({ status: true })} style={{ flex: 0.2 }}>
        <FontAwesome style={{ textAlign: 'center' }} name="edit" size={24} color={styling.colors.Asphalt} />
      </Pressable>
    )
  } else {
    return (
      <Pressable onPress={() => setAccountValue({ status: false })} style={{ flex: 0.20, alignItems: 'center' }}>
        <FontAwesome style={{ width: 50, padding: 10, textAlign: 'center' }} name="remove" size={24} color={styling.colors.Asphalt} />
      </Pressable>
    )
  };
};

// Export "SelectedOption" component, so other components like "App.js" are able to use this hooks's content.
export default SelectedOption;
