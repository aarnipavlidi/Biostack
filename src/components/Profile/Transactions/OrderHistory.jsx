// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { Alert, ActivityIndicator, FlatList, View, StyleSheet } from 'react-native'; // Import following components from "react-native" library for this component usage.

import UserOrders from './UserOrders'; // Import "UserOrders" component from "UserOrders.jsx" file for this component usage.
import OrderHistoryHeader from './OrderHistoryHeader'; // Import "OrderHistoryHeader" component from "OrderHistoryHeader.jsx" file for this component usage.

import styling from '../../../styling'; // Import "styling" variable from "styling.js" for this component usage.

// Define "loadingContainer" variable, which will be used to create style
// if data is "loading" we will return => "loading spinner".
const loadingContainer = StyleSheet.create({
  container: {
    backgroundColor: styling.colors.VistaWhite,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const OrderHistory = ({ currentUserData, loading }) => {

  const getUserTransactions = currentUserData
    ? currentUserData.transactions.map(results => results)
    : [];

  // If "me" querys data => "currentUserData" is still loading from the dabase, component
  // will render everything inside of (...) (loading spinner) untill data has loaded.
  if (loading) {
    return (
      <View style={loadingContainer.container}>
        <ActivityIndicator size="large" color={styling.colors.Asphalt} />
      </View>
    );
  };

  // Otherwise component will render everything inside of (...) back to the user.
  return (
    <FlatList
      data={getUserTransactions}
      keyExtractor={(item, index) => item._id}
      renderItem={({ item }) => <UserOrders item={item} />}
      ListHeaderComponent={<OrderHistoryHeader />}
    />
  );
};

// Export "OrderHistory" component, so other components like "App.js" are able to use this hooks's content.
export default OrderHistory;
