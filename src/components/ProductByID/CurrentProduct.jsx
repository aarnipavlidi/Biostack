// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react'; // Import "react" library's content for this component usage.
import { useHistory } from 'react-router-native'; // Import following components from "react-router-native" library's content for this component usage.
import { ActivityIndicator, Image, StyleSheet, Pressable, ScrollView, View, Text, FlatList } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Appbar, Caption, Card, Divider, Title, Paragraph, List, Provider } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.

import Checkout from './Checkout'; // Import "Checkout" component from "Checkout.jsx" file for this component usage.
import ButtonOptions from './ButtonOptions'; // Import "ButtonOptions" component from "ButtonOptions.jsx" file for this component usage.
import UserRating from '../UserRating'; // Import "UserRating" component from "UserRating.jsx" file for this component usage.
import ItemTypeCheck from '../ProductChecking/ItemTypeCheck'; // Import "ItemTypeCheck" component from "ItemTypeCheck.jsx" file for this component usage.
import ItemSizeCheck from '../ProductChecking/ItemSizeCheck'; // Import "ItemSizeCheck" component from "ItemSizeCheck.jsx" file for this component usage.
import useCurrentProduct from '../../hooks/useCurrentProduct'; // Import "useCurrentProduct" hook from "useCurrentProduct.js" file for this component usage.

import styling from '../../styling'; // Import "styling" variable from "styling.js" for this component usage.

// Define "loadingContainer" variable, which will be used to create style
// if data is "loading" we will return => "loading spinner".
const loadingContainer = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
  },
});

const headerContainer = StyleSheet.create({
  appBarContainer: {
    backgroundColor: styling.colors.Asphalt,
    height: 50
  },
  appBarContent: {
    color: styling.colors.VistaWhite,
  },
});

const productContainer = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    elevation: 3,
  },
  productTitle: {
    backgroundColor: styling.colors.Asphalt,
    borderWidth: 1,
    borderColor: styling.colors.Asphalt,
    color: styling.colors.VistaWhite,
    fontSize: styling.fontSizes.subheading,
    textAlign: 'center',
    height: 'auto',
    width: 55,
    elevation: 5,
  },
  productContent: {
    alignSelf: 'center',
    marginTop: 5,
  },
});

const sellerContainer = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    alignSelf: 'center',
    borderBottomWidth: 2,
    borderBottomColor: styling.colors.Asphalt
  },
  sellerContent: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
});

const CurrentProduct = ({ currentUserData, loadingUserData }) => {

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const { getCurrentProduct, loading } = useCurrentProduct();

  const history = useHistory(); // Define "history" variable, which will execute => "useHistory(...)" function.

  // Define "goBackPreviousRoute" variable, which will execute everything inside
  // of {...}. When app will render this component, user can choose to go back
  // previous route where user was. If for example user came from "Home", then
  // this function will redirect user to => "/dashboard" path when referenced.
  const goBackPreviousRoute = () => {
    history.goBack();
  };

  // If data from the hook "useProducts(...)" is loading, then component
  // will render everything inside of (...) back to the user.
  if (loading || loadingUserData) {
    return (
      <View style={loadingContainer.container}>
        <ActivityIndicator size="large" color={styling.colors.Asphalt} />
      </View>
    );
  };

  // Otherwise component will render everything inside of (...) back to the user.
  return (
    <ScrollView>
      <Provider>
        <Appbar.Header style={headerContainer.appBarContainer} statusBarHeight={0}>
          <Appbar.BackAction onPress={goBackPreviousRoute} />
          <Appbar.Content style={headerContainer.appBarContent} title={getCurrentProduct.productTitle} titleStyle={{ fontFamily: 'PermanentMarker_400Regular' }} />
        </Appbar.Header>
        <Card style={productContainer.container}>
          <Card.Cover style={{ width: 330, height: 332, alignSelf: 'center', marginTop: 5 }} source={require('../../../assets/images/clothes/Vanilla_Front_900x.jpg')} />
          <Card.Content>
            <Paragraph>{getCurrentProduct.productDescription}</Paragraph>
            <Divider style={{ marginTop: 10, marginBottom: 10 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <View>
                <Text style={productContainer.productTitle}>Type</Text>
                <View style={productContainer.productContent}>
                  <ItemTypeCheck currentItemType={getCurrentProduct.productGroupName} />
                </View>
              </View>
              <View>
                <Text style={productContainer.productTitle}>Size</Text>
                <View style={productContainer.productContent}>
                  <ItemSizeCheck currentItemSize={getCurrentProduct.productSize} />
                </View>
              </View>
              <View>
                <Text style={productContainer.productTitle}>Price</Text>
                <View style={productContainer.productContent}>
                  <Text style={{ fontSize: 16}}>{getCurrentProduct.productPrice} €</Text>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card style={sellerContainer.container}>
          <Card.Content>
            <View style={sellerContainer.header}>
              <View>
                <View style={sellerContainer.headerTitle}>
                  <Title style={{ color: styling.colors.Asphalt }}>Seller information</Title>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={sellerContainer.sellerContent}>
                    <Text style={{ fontSize: 17.5 }}>{getCurrentProduct.owner.name}</Text>
                    <Caption>Product owner</Caption>
                  </View>
                  <View style={sellerContainer.sellerContent}>
                    <UserRating currentRating={getCurrentProduct.owner.rating} />
                    <Caption>Current rating</Caption>
                  </View>
                </View>
              </View>
              <View>
                <Image style={{ width: 75, height: 75, borderRadius: 75 / 2 }} source={{ uri: 'https://picsum.photos/75/75?grayscale'}} />
              </View>
            </View>
          </Card.Content>
        </Card>
        <ButtonOptions getCurrentProduct={getCurrentProduct} currentUserData={currentUserData} showModal={showModal} />
        <Checkout getCurrentProduct={getCurrentProduct} currentUserData={currentUserData} visible={visible} hideModal={hideModal} />
      </Provider>
    </ScrollView>
  );
};

// Export "CurrentProduct" component, so other components like "App.js" are able to use this hooks's content.
export default CurrentProduct;
