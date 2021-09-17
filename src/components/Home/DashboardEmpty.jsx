// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { View, StyleSheet, Image, Text } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Card, Title } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.
import { Octicons } from '@expo/vector-icons'; // Import following components from "@expo/vector-icons" libary for this component usage.

import styling from '../../styling'; // Import "styling" variable from "styling.js" for this component usage.

const emptyProductsContainer = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: '25%',
    marginBottom: 5,
    backgroundColor: styling.colors.VistaWhite,
    alignItems: 'center',
    elevation: 5,
  },
  containerImage: {
    backgroundColor: styling.colors.VistaWhite
  },
  content: {
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'PermanentMarker_400Regular',
    color: styling.colors.Asphalt
  },
  text: {
    textAlign: 'center',
    fontFamily: 'AnnieUseYourTelescope_400Regular',
    color: styling.colors.Asphalt,
    fontSize: 22,
  },
});

// Define "DashboardEmpty;" component, which will execute everything inside of {...}.
const DashboardEmpty = () => {

  // Component will render everything inside of (...) back to the user.
  return (
    <Card style={emptyProductsContainer.container}>
      <Card.Cover style={emptyProductsContainer.containerImage} resizeMode='contain' source={require('../../../assets/images/content/fold-icon-19.jpg')} />
      <Card.Content style={emptyProductsContainer.content}>
        <Title style={emptyProductsContainer.title}>Biostack</Title>
        <Text style={emptyProductsContainer.text}>No matching results with your current keyword from search. Try different keyword to search your product from our app! <Octicons name="heart" size={22} color={styling.colors.Asphalt} /></Text>
      </Card.Content>
    </Card>
  );
};

// Export "DashboardEmpty" component, so other components like "App.js" are able to use this hooks's content.
export default DashboardEmpty;
