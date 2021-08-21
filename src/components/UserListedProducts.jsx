// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { View, StyleSheet, Text } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Card, Title, Paragraph } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.

import styling from '../styling'; // Import "styling" variable from "styling.js" for this component usage.

const listedProductsContainer = StyleSheet.create({
  mainContainer: {
    alignItems: 'center'
  },
  cardContainer: {
    elevation: 15,
    width: '90%',
    backgroundColor: styling.colors.VistaWhite
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  priceContainer: {
    alignItems: 'center'
  },
  groupNameContainer: {
    alignItems: 'center'
  }
});

const UserListedProducts = ({ item }) => {

  return (
    <View style={listedProductsContainer.mainContainer}>
      <Card style={listedProductsContainer.cardContainer}>
        <Card.Content>
          <Title>{item.productTitle}</Title>
          <Paragraph>{item.productDescription}</Paragraph>
          <View style={listedProductsContainer.content}>
            <View style={listedProductsContainer.priceContainer}>
              <Text>Item current price:</Text>
              <Text>{item.productPrice} €</Text>
            </View>
            <View style={listedProductsContainer.groupNameContainer}>
              <Text>Item listed on:</Text>
              <Text>{item.productGroupName}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default UserListedProducts;
