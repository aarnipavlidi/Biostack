// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this hooks usage.
import { useQuery } from '@apollo/client'; // Import following functions from "@apollo/client" library for this hook usage.
import { SHOW_ALL_PRODUCTS } from '../graphql/queries'; // Import following queries from "queries.js" file for this hook usage.

// Define "useProducts" hook, which will execute everything inside of {...}, so basically
// hook's purpose is to get all products from backend via "SHOW_ALL_PRODUCTS" query and
// show them back to the user at "Dashboard" component.
const useProducts = () => {

  // Define "SHOW_ALL_PRODUCTS" query and use variables inside of {...}
  // to be used within this query. If query returns data, we can access
  // it via "data" variable and if data itself from backend is loading,
  // then we can use "loading" variable and render "spinner" for example.
  const { loading, error, data } = useQuery(SHOW_ALL_PRODUCTS);

  // Return variables inside of {...} to be used with this hook.
  return {
    getAllProducts: data?.showAllProducts,
    loading,
  };
};

// Export "useProducts" hook, so other components like "App.js" are able to use this hooks's content.
export default useProducts;