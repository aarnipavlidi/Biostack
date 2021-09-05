// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { StyleSheet, Pressable, View, Text } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { FontAwesome5, Ionicons } from '@expo/vector-icons'; // Import following components from "@expo/vector-icons" libary for this component usage.

import styling from '../../styling'; // Import "styling" variable from "styling.js" for this component usage.

const buttonContainer = StyleSheet.create({
  productButtonContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    marginBottom: 15,
  },
  productButton: {
    backgroundColor: styling.colors.Asphalt,
    flex: 1/3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 45 / 2,
    paddingRight: 7,
    elevation: 5,
  },
  productButtonText: {
    color: styling.colors.VistaWhite,
    fontSize: 18,
    marginLeft: 7,
    marginRight: 7,
  },
});

const ButtonOptions = ({ getCurrentProduct, currentUserData, showModal }) => {

  if (getCurrentProduct.owner._id === currentUserData._id) {
    return (
      <View style={buttonContainer.productButtonContainer}>
        <Pressable style={buttonContainer.productButton} onPress={() => console.log('Edit button has been pressed.')}>
          <Text style={buttonContainer.productButtonText}>Edit product</Text>
        </Pressable>
        <Pressable style={buttonContainer.productButton} onPress={() => console.log('Delete button has been pressed.')}>
          <Text style={buttonContainer.productButtonText}>Delete product</Text>
        </Pressable>
      </View>
    );
  } else {
    return (
      <View style={buttonContainer.productButtonContainer}>
        <Pressable style={buttonContainer.productButton} onPress={showModal}>
          <Text style={buttonContainer.productButtonText}>Checkout</Text>
          <FontAwesome5 name="hand-holding-heart" size={18} color={styling.colors.VistaWhite} />
        </Pressable>
        <Pressable style={buttonContainer.productButton} onPress={() => console.log('Bookmark has been pressed.')}>
          <Text style={buttonContainer.productButtonText}>Bookmark</Text>
          <Ionicons name="bookmarks" size={18} color={styling.colors.VistaWhite} />
        </Pressable>
      </View>
    );
  };
};

// Export "ButtonOptions" component, so other components like "App.js" are able to use this hooks's content.
export default ButtonOptions;
