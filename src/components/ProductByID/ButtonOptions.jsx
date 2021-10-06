// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { useHistory } from 'react-router-native'; // Import following functions from "react-router-native" library's content for this component usage.
import { Alert, StyleSheet, Pressable, View, Text } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Fontisto, FontAwesome, Ionicons, MaterialCommunityIcons  } from '@expo/vector-icons'; // Import following components from "@expo/vector-icons" libary for this component usage.

import useDeleteProduct from '../../hooks/useDeleteProduct'; // Import "useDeleteProduct" hook from "useDeleteProduct.js" file for this component usage.

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
    flex: 1.25/3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    elevation: 5,
  },
  productButtonText: {
    color: styling.colors.VistaWhite,
    fontFamily: styling.fonts.buttonContent,
    fontSize: 12,
    marginLeft: 10,
    marginRight: 10,
  },
});

const ButtonOptions = ({ getCurrentProduct, currentUserData, showModal, showSnackBar }) => {

  const history = useHistory(); // Define "history" variable, which will execute => "useHistory(...)" function.
  const [deleteProductFromDatabase] = useDeleteProduct(); // Define "deleteProductFromDatabase" variable from => "useDeleteProduct(...)" hook.

  const removeUserProduct = async () => {
    try {
      const response = await deleteProductFromDatabase(getCurrentProduct._id);
      showSnackBar(response.deleteProduct.response);
      history.push('/dashboard');
    } catch (error) {
      console.log(error.message);
    }
  };

  const confirmProductDelete = () => {
    Alert.alert(
      "Biostack",
      "Are you sure you want to delete this item from the app?",
      [
        {
          text: "CANCEL",
          onPress: () => console.log('User has cancelled account deletion process!'),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => removeUserProduct(),
        }
      ]
    )
  };

  if (getCurrentProduct.owner._id === currentUserData._id) {
    return (
      <View style={buttonContainer.productButtonContainer}>
        <Pressable style={buttonContainer.productButton}>
          <Text style={buttonContainer.productButtonText}>EDIT PRODUCT</Text>
          <FontAwesome name="edit" size={18} color={styling.colors.VistaWhite} />
        </Pressable>
        <Pressable style={buttonContainer.productButton} onPress={confirmProductDelete}>
          <Text style={buttonContainer.productButtonText}>DELETE PRODUCT</Text>
          <MaterialCommunityIcons name="delete-outline" size={18} color={styling.colors.VistaWhite} />
        </Pressable>
      </View>
    );
  } else {
    return (
      <View style={buttonContainer.productButtonContainer}>
        <Pressable style={buttonContainer.productButton} onPress={showModal}>
          <Text style={buttonContainer.productButtonText}>CHECKOUT</Text>
          <Fontisto name="shopping-basket-add" size={18} color={styling.colors.VistaWhite} />
        </Pressable>
        <Pressable style={buttonContainer.productButton}>
          <Text style={buttonContainer.productButtonText}>BOOKMARK</Text>
          <Ionicons name="bookmarks" size={18} color={styling.colors.VistaWhite} />
        </Pressable>
      </View>
    );
  };
};

// Export "ButtonOptions" component, so other components like "App.js" are able to use this hooks's content.
export default ButtonOptions;
