// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { ActivityIndicator, FlatList, Text, StyleSheet, View } from 'react-native'; // Import following components from "react-native" library for this component usage.

import ProductRenderAll from './ProductRenderAll'; // Import "ProductRenderAll" component from "ProductRenderAll.jsx" file this component usage.
import DashboardHeader from './DashboardHeader'; // Import "DashboardHeader" component from "DashboardHeader.jsx" file this component usage.

import useProducts from '../hooks/useProducts'; // Import "useProducts" hook from "useProducts.js" file for this component usage.

import styling from '../styling'; // Import "styling" variable from "styling.js" for this component usage.

// Define "loadingContainer" variable, which will be used to create style
// if data is "loading" we will return => "loading spinner".
const loadingContainer = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
  },
});

// Define component "Dashboard", which will execute everything inside of {...}, component
// will be rendered everytime user has successfully logged to the app. Component will
// render every product which has been added to the app by various different users.
const Dashboard = () => {

  const { getAllProducts, loading } = useProducts(); // Define following variables from "useProducts(...)" hook.

  // Define "showAllProducts" variable, which will return either function =>
  // "getAllProducts.map(results => results)" if "getAllProducts" variable
  // has data or empty array => [] if variable has no data to show for the user.
  const showAllProducts = getAllProducts
    ? getAllProducts.map(results => results)
    : [];

  // If data from the hook "useProducts(...)" is loading, then component
  // will render everything inside of (...) back to the user.
  if (loading) {
    return (
      <View style={loadingContainer.container}>
        <ActivityIndicator size="large" color={styling.colors.Asphalt} />
      </View>
    );
  };

  // Component will render everything inside of (...) back to the user.
  return (
    <FlatList
      data={showAllProducts}
      keyExtractor={(item, index) => item._id}
      renderItem={({ item }) => <ProductRenderAll item={item} />}
      ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
      numColumns={2}
      columnWrapperStyle={{ flex: 1, justifyContent: 'space-between' }}
      ListHeaderComponent={<DashboardHeader />}
      ListHeaderComponentStyle={{ marginBottom: 7 }}
    />
  );
};

// Export "Dashboard" component, so other components like "App.js" are able to use this hooks's content.
export default Dashboard;
