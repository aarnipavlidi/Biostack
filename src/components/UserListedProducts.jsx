// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { Image, View, StyleSheet, Text } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Badge, Card, Title, Paragraph } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.

import styling from '../styling'; // Import "styling" variable from "styling.js" for this component usage.

const listedProductsContainer = StyleSheet.create({
  cardContainer: {
    elevation: 5,
    width: '90%',
    marginBottom: 10,
    alignSelf: 'center',
    backgroundColor: styling.colors.VistaWhite
  },
  primaryContainer: {
    flexDirection: 'row',
    height: 'auto',
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
    marginTop: 10,
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

const ItemType = ({ currentItemType }) => {

  if (currentItemType === 't-shirt') {
    return (
      <Image style={listedProductsContainer.productGroupNameContainer} source={require('../../assets/icons/clothes/t-24x24-455076.png')} />
    );
  };

  if (currentItemType === 'sweater') {
    return (
      <Image style={listedProductsContainer.productGroupNameContainer} source={require('../../assets/icons/clothes/sweater-24x24-455072.png')} />
    );
  };
};

const UserListedProducts = ({ item }) => {

  return (
    <View>
      <Card style={listedProductsContainer.cardContainer}>
        <Card.Content>
          <View style={listedProductsContainer.primaryContainer}>
            <View>
              <Title>{item.productTitle}</Title>
            </View>
          </View>

          <View style={listedProductsContainer.secondaryContainer}>
            <View style={listedProductsContainer.productDescriptionContainer}>
              <Paragraph>{item.productDescription}</Paragraph>
            </View>
            <Image style={listedProductsContainer.productImageContainer} source={{ uri: 'https://picsum.photos/60/60?grayscale'}} />
          </View>

          <View style={listedProductsContainer.contentContainer}>
            <View>
              <Text style={listedProductsContainer.productGroupNameTitle}>Item type</Text>
              <ItemType currentItemType={item.productGroupName} />
            </View>
            <View>
              <Text style={listedProductsContainer.productSizeTitle}>Item size</Text>
              <Badge style={listedProductsContainer.productSizeContainer} size={24}>{item.productSize}</Badge>
            </View>
            <View>
              <Text style={listedProductsContainer.productPriceTitle}>Item price (€)</Text>
              <Badge style={listedProductsContainer.productPriceContainer} size={24}>{item.productPrice}</Badge>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default UserListedProducts;
