// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { useHistory } from 'react-router-native'; // Import following components from "react-router-native" library's content for this component usage.
import { ActivityIndicator, Image, StyleSheet, View, Text } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Appbar, Card, Title } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.

import UserRating from './UserRating'; // Import "UserRating" component from "UserRating.jsx" file for this component usage.
import useCurrentProduct from '../hooks/useCurrentProduct'; // Import "useCurrentProduct" hook from "useCurrentProduct.js" file for this component usage.

import styling from '../styling'; // Import "styling" variable from "styling.js" for this component usage.

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

const imageContainer = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    elevation: 3
  },
});

const profileOverviewContainer = StyleSheet.create({
  mainContainer: {
    elevation: 5,
    width: '90%',
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: styling.colors.VistaWhite
  },
  headerContainer: {
    flexDirection: 'row',
    height: 50,
  },
  avatarContainer: {
    position: 'absolute',
    right: 0,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5
  },
  contentPrimary: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  contentSecondary: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  contentButton: {
    height: 25,
    borderWidth: 10,
    borderRadius: 25 / 2,
    backgroundColor: styling.colors.Asphalt,
    textAlign: 'center',
    color: styling.colors.VistaWhite
  },
});

const CurrentProduct = () => {

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
  if (loading) {
    return (
      <View style={loadingContainer.container}>
        <ActivityIndicator size="large" color={styling.colors.Asphalt} />
      </View>
    );
  };

  return (
    <View>
      <Appbar.Header style={headerContainer.appBarContainer} statusBarHeight={0}>
        <Appbar.BackAction onPress={goBackPreviousRoute} />
        <Appbar.Content style={headerContainer.appBarContent} title={getCurrentProduct.productTitle} />
      </Appbar.Header>
      <Card style={imageContainer.container}>
        <Card.Cover style={{ width: 360, height: 362 }} source={require('../../assets/images/clothes/Vanilla_Front_900x.jpg')} />
      </Card>
      <Card style={profileOverviewContainer.mainContainer}>
        <Card.Content>
          <View style={profileOverviewContainer.headerContainer}>
            <Title>Profile Overview</Title>
            <View style={profileOverviewContainer.avatarContainer}>
              <Image style={{ width: 50, height: 50, borderRadius: 50 / 2 }} source={{ uri: 'https://picsum.photos/50/50?grayscale'}} />
            </View>
          </View>

          <View style={profileOverviewContainer.contentContainer}>

            <View style={profileOverviewContainer.contentPrimary}>
              <Text style={profileOverviewContainer.contentButton}>Username</Text>
              <Text>{getCurrentProduct.owner.username}</Text>
            </View>
            <View style={profileOverviewContainer.contentSecondary}>
              <Text style={profileOverviewContainer.contentButton}>Name</Text>
              <Text>{getCurrentProduct.owner.name}</Text>
            </View>
          </View>

          <View style={profileOverviewContainer.contentContainer}>

            <View style={profileOverviewContainer.contentPrimary}>
              <Text style={profileOverviewContainer.contentButton}>Rating</Text>
              <UserRating currentRating={getCurrentProduct.owner.rating} />
            </View>

            <View style={profileOverviewContainer.contentSecondary}>
              <Text style={profileOverviewContainer.contentButton}>Email</Text>
              <Text>{getCurrentProduct.owner.email}</Text>
            </View>

          </View>
        </Card.Content>
      </Card>
    </View>
  );

};

// Export "CurrentProduct" component, so other components like "App.js" are able to use this hooks's content.
export default CurrentProduct;
