// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { Alert, Image, View, StyleSheet, Pressable, Text } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Badge, Card, Title, Paragraph } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.

import useDeleteProduct from '../../../hooks/useDeleteProduct'; // Import "useDeleteProduct" hook from "useDeleteProduct.js" file for this component usage.
import ProductImage from './ProductImage'; // Import "ProductImage" component from "ProductImage.jsx" file for this component usage.
import ItemTypeCheck from '../../ProductChecking/ItemTypeCheck'; // Import "ItemTypeCheck" component from "ItemTypeCheck.jsx" file for this component usage.
import { AntDesign } from '@expo/vector-icons'; // Import following components from "@expo/vector-icons" libary for this component usage.

import styling from '../../../styling'; // Import "styling" variable from "styling.js" for this component usage.

const listedProductsContainer = StyleSheet.create({
  cardContainer: {
    elevation: 5,
    width: '90%',
    marginTop: 7,
    marginBottom: 7,
    alignSelf: 'center',
    backgroundColor: styling.colors.VistaWhite
  },
  primaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  secondaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 60,
  },
  productDescriptionContainer: {
    flexShrink: 1,
    marginRight: 1,
  },
  productImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  contentContainer: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-evenly',
  },
  productGroupNameContainer: {
    alignSelf: 'center',
    marginTop: 5
  },
  productGroupNameTitle: {
    fontSize: styling.fontSizes.subheading,
    color: styling.colors.Asphalt,
  },
  productSizeContainer: {
    alignSelf: 'center',
    marginTop: 5,
    backgroundColor: styling.colors.Asphalt,
    fontWeight: "700",
    color: styling.colors.VistaWhite,
  },
  productSizeTitle: {
    fontSize: styling.fontSizes.subheading,
    color: styling.colors.Asphalt,
  },
  productPriceContainer: {
    alignSelf: 'center',
    marginTop: 5,
    backgroundColor: styling.colors.Asphalt,
    fontWeight: "700",
    color: styling.colors.VistaWhite,
  },
  productPriceTitle: {
    fontSize: styling.fontSizes.subheading,
    color: styling.colors.Asphalt,
  },
});

const UserListedClothes = ({ item }) => {

  const [deleteProductFromDatabase] = useDeleteProduct(); // Define "deleteProductFromDatabase" variable from => "useDeleteProduct(...)" hook.

  const removeUserProduct = async () => {
    try {
      await deleteProductFromDatabase(item._id);
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

  // Component will render everything inside of (...) back to the user.
  return (
    <View>
      <Card style={listedProductsContainer.cardContainer}>
        <Card.Content>

          <View style={listedProductsContainer.primaryContainer}>
            <View>
              <Title>{item.productTitle}</Title>
            </View>
            <Pressable onPress={confirmProductDelete}>
              <AntDesign style={{ alignSelf: 'center' }} name="delete" size={20} color={styling.colors.Asphalt} />
            </Pressable>
          </View>

          <View style={listedProductsContainer.secondaryContainer}>
            <View style={listedProductsContainer.productDescriptionContainer}>
              <Paragraph>{item.productDescription}</Paragraph>
            </View>
            <ProductImage getImageName={item.productImage.name} getImageValue={item.productImage.value} />
          </View>

          <View style={listedProductsContainer.contentContainer}>
            <View>
              <Text style={listedProductsContainer.productGroupNameTitle}>Item Type</Text>
              <ItemTypeCheck currentItemType={item.productImage.name} />
            </View>
            <View>
              <Text style={listedProductsContainer.productSizeTitle}>Item Size</Text>
              <Badge style={listedProductsContainer.productSizeContainer} size={24}>{item.productSize}</Badge>
            </View>
            <View>
              <Text style={listedProductsContainer.productPriceTitle}>Item Price (€)</Text>
              <Badge style={listedProductsContainer.productPriceContainer} size={24}>{item.productPrice}</Badge>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

// Export "UserListedClothes" component, so other components like "App.js" are able to use this hooks's content.
export default UserListedClothes;
