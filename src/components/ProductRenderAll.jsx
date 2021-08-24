// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { Image, Text, View, StyleSheet } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Card, Title, Paragraph } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.

import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import following components from "@expo/vector-icons" libary for this component usage.

import styling from '../styling'; // Alustetaan "styling" niminen muuttuja, jonka avulla sovellus ottaa erillisen tyylitiedoston (styling.js) käyttöönsä.

const ItemTypeCheck = ({ currentItemType }) => {

  if (currentItemType === 't-shirt') {
    return (
      <Image source={require('../../assets/icons/clothes/t-24x24-455076.png')} />
    );
  };

  if (currentItemType === 'sweater') {
    return (
      <Image style={{ height: 5, width: 5 }} source={require('../../assets/icons/clothes/sweater-24x24-455072.png')} />
    );
  };
};

const ItemSizeCheck = ({ currentItemSize }) => {

  if (currentItemSize === 'XS') {
    return (
      <MaterialCommunityIcons name="size-xs" size={24} color={styling.colors.Asphalt} />
    );
  };

  if (currentItemSize === 'S') {
    return (
      <MaterialCommunityIcons name="size-s" size={24} color={styling.colors.Asphalt} />
    );
  };

  if (currentItemSize === 'M') {
    return (
      <MaterialCommunityIcons name="size-m" size={24} color={styling.colors.Asphalt} />
    );
  };

  if (currentItemSize === 'L') {
    return (
      <MaterialCommunityIcons name="size-l" size={24} color={styling.colors.Asphalt} />
    );
  };

  if (currentItemSize === 'XL') {
    return (
      <MaterialCommunityIcons name="size-xl" size={24} color={styling.colors.Asphalt} />
    );
  };

  if (currentItemSize === 'XXL') {
    return (
      <MaterialCommunityIcons name="size-xxl" size={24} color={styling.colors.Asphalt} />
    );
  };
};

const productContainer = StyleSheet.create({
  cardContainer: {
    flex: 1/2,
    marginLeft: 5,
    marginRight: 5,
    elevation: 3
  },
  productTitle: {
    borderTopWidth: 0.5,
    alignItems: 'center'
  },
  productFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 2,
  },
});

const ProductRenderAll = ({ item }) => {

  return (
    <Card style={productContainer.cardContainer}>
      <Card.Content>
        <Card.Cover source={require('../../assets/images/clothes/Vanilla_Front_900x.jpg')} />
        <View style={productContainer.productTitle}>
          <Text>{item.productTitle}</Text>
        </View>
        <View style={productContainer.productFeatures}>
          <ItemTypeCheck currentItemType={item.productGroupName} />
          <ItemSizeCheck currentItemSize={item.productSize} />
          <Text>{item.productPrice} €</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

// Export "ProductRenderAll" component, so other components like "App.js" are able to use this hooks's content.
export default ProductRenderAll;
