// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react'; // Import "react" library's content for this component usage.
import { useApolloClient, useSubscription } from '@apollo/client'; // Import following functions from "@apollo/client" library for this hook usage.
import { SHOW_ALL_PRODUCTS, PRODUCT_ADDED, PRODUCT_PURCHASED, PRODUCT_DELETED, PRODUCT_DELETED_MANY } from '../../graphql/queries'; // Import following queries from "queries.js" file for this hook usage.
import { ActivityIndicator, FlatList, Text, StyleSheet, View, LogBox } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Appbar, Searchbar } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.
import { MaterialIcons } from '@expo/vector-icons'; // Import following components from "@expo/vector-icons" libary for this component usage.

import ProductRenderAll from './ProductRenderAll'; // Import "ProductRenderAll" component from "ProductRenderAll.jsx" file for this component usage.
import DashboardHeader from './DashboardHeader'; // Import "DashboardHeader" component from "DashboardHeader.jsx" file for this component usage.
import DashboardEmpty from './DashboardEmpty'; // Import "DashboardEmpty" component from "DashboardEmpty.jsx" file for this component usage.

import useProducts from '../../hooks/useProducts'; // Import "useProducts" hook from "useProducts.js" file for this component usage.
import useProductFilter from '../../hooks/useProductFilter'; // Import "useProductFilter" hook from "useProductFilter.js" file for this component usage.
import styling from '../../styling'; // Import "styling" variable from "styling.js" for this component usage.

// Define "loadingContainer" variable, which will be used to create style
// if data is "loading" we will return => "loading spinner".
const loadingContainer = StyleSheet.create({
  container: {
    flex: 1
  },
  appBarContainer: {
    backgroundColor: styling.colors.Asphalt,
    height: 50,
  },
  appBarContent: {
    color: styling.colors.VistaWhite,
  },
  loadingSpinner: {
    flex: 1,
    justifyContent: 'center',
  }
});

// Define component "Dashboard", which will execute everything inside of {...}, component
// will be rendered everytime user has successfully logged to the app. Component will
// render every product which has been added to the app by various different users.
const Dashboard = ({ searchStatus, resetSearchBar, activateSearchBar, currentSearchValue, setCurrentSearchValue, debouncedSearchValue }) => {

  const client = useApolloClient();

  const productAddedCache = async (response) => {
    console.log(response);
    await client.refetchQueries({
      include: "active",
    });
  };

  useSubscription(PRODUCT_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const response = subscriptionData.data.productAdded
      productAddedCache(response)
    },
  });

  const productPurchasedCache = async (response) => {
    console.log(response);
    await client.refetchQueries({
      include: "active",
    });
  };

  useSubscription(PRODUCT_PURCHASED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const response = subscriptionData.data.productPurchased
      productPurchasedCache(response)
    },
  });

  const productDeletedCache = async (response) => {
    console.log(response);
    await client.refetchQueries({
      include: "active",
    });
  };

  useSubscription(PRODUCT_DELETED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const response = subscriptionData.data.productDeleted
      productDeletedCache(response)
    },
  });

  const productDeletedManyCache = async (response) => {
    console.log(response);
    await client.refetchQueries({
      include: "active",
    });
  };

  useSubscription(PRODUCT_DELETED_MANY, {
    onSubscriptionData: ({ subscriptionData }) => {
      const response = subscriptionData.data.productDeletedMany
      productDeletedManyCache(response)
    },
  });

  const { getAllProducts, fetchMore, loading } = useProducts({ productSearchValue: debouncedSearchValue }); // Define following variables from "useProducts(...)" hook.

  // Define "showAllProducts" variable, which will return either function =>
  // "getAllProducts.map(results => results)" if "getAllProducts" variable
  // has data or empty array => [] if variable has no data to show for the user.
  const showAllProducts = getAllProducts
    ? getAllProducts.edges.map(results => results.node)
    : [];

  const onEndReach = () => {
    console.log('Fetching more products from server!');
    fetchMore();
  };

  // If data from the hook "useProducts(...)" is loading, then component
  // will render everything inside of (...) back to the user.
  if (loading) {
    return (
      <View style={loadingContainer.container}>
        <Appbar.Header style={loadingContainer.appBarContainer} statusBarHeight={0}>
          <Appbar.Content style={loadingContainer.appBarContent} title="Biostack" titleStyle={{ fontFamily: 'PermanentMarker_400Regular' }} />
          {searchStatus === true
            ? <Searchbar style={{ height: 30, width: 80, marginRight: 5, flexGrow: 1 }} placeholder="Search for item" value={currentSearchValue} onChangeText={(getInputValue) => setCurrentSearchValue(getInputValue)} inputStyle={{ fontSize: 13 }} clearIcon={() => <MaterialIcons name="clear" size={24} onPress={() => resetSearchBar()} color={styling.colors.Asphalt} />}/>
            : <Appbar.Action icon="magnify" onPress={activateSearchBar} />
          }
        </Appbar.Header>
        <View style={loadingContainer.loadingSpinner}>
          <ActivityIndicator size="large" color={styling.colors.Asphalt} />
        </View>
      </View>
    );
  };

  LogBox.ignoreAllLogs();

  // Component will render everything inside of (...) back to the user.
  return (
    <FlatList
      data={showAllProducts}
      ListEmptyComponent={<DashboardEmpty />}
      onEndReached={() => onEndReach()}
      onEndReachedThreshold={0.2}
      keyExtractor={(item, index) => String(index)}
      renderItem={({ item }) => <ProductRenderAll item={item} />}
      ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
      numColumns={2}
      columnWrapperStyle={{ flex: 1, justifyContent: 'space-between' }}
      ListHeaderComponent={<DashboardHeader searchStatus={searchStatus} resetSearchBar={resetSearchBar} activateSearchBar={activateSearchBar} currentSearchValue={currentSearchValue} setCurrentSearchValue={setCurrentSearchValue} />}
      ListHeaderComponentStyle={{ marginBottom: 7 }}
    />
  );
};

// Export "Dashboard" component, so other components like "App.js" are able to use this hooks's content.
export default Dashboard;
