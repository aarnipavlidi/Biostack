// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { useHistory } from 'react-router-native'; // Import following components from "react-router-native" library's content for this component usage.
import { Pressable, Image, Text, View, StyleSheet } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Card, Title, Paragraph } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.

import ItemTypeCheck from './ProductChecking/ItemTypeCheck'; // Import "ItemTypeCheck" component from "ItemTypeCheck.jsx" file for this component usage.
import ItemSizeCheck from './ProductChecking/ItemSizeCheck'; // Import "ItemSizeCheck" component from "ItemSizeCheck.jsx" file for this component usage.

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

  const history = useHistory(); // Define "history" variable, which will execute => "useHistory(...)" function.

  return (
    <Card style={productContainer.cardContainer}>
      <Pressable onPress={() => history.push(`/dashboard/${item._id}`)}>
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
      </Pressable>
    </Card>
  );
};

// Export "ProductRenderAll" component, so other components like "App.js" are able to use this hooks's content.
export default ProductRenderAll;
