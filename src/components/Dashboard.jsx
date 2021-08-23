// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { ActivityIndicator, FlatList, Text, StyleSheet, View } from 'react-native'; // Import following components from "react-native" library for this component usage.

import ProductRenderAll from './ProductRenderAll';

import useProducts from '../hooks/useProducts'; // Import "useProducts" hook from "useProducts.js" file for this component usage.

import styling from '../styling'; // Import "styling" variable from "styling.js" for this component usage.

const loadingContainer = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
  },
});

const Dashboard = () => {

  const { getAllProducts, loading } = useProducts();

  const showAllProducts = getAllProducts
    ? getAllProducts.map(results => results)
    : [];

  if (loading) {
    return (
      <View style={loadingContainer.container}>
        <ActivityIndicator size="large" color={styling.colors.Asphalt} />
      </View>
    );
  };

  return (
    <FlatList
      data={showAllProducts}
      keyExtractor={(item, index) => item._id}
      renderItem={({ item }) => <ProductRenderAll item={item} />}
      ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
      numColumns={2}
      columnWrapperStyle={{ flex: 1, justifyContent: 'space-between' }}
    />
  );
};

export default Dashboard;
