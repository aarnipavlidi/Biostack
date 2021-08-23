// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this hooks usage.
import { useQuery } from '@apollo/client'; // Import following functions from "@apollo/client" library for this hook usage.
import { SHOW_ALL_PRODUCTS } from '../graphql/queries'; // Import following queries from "queries.js" file for this hook usage.

const useProducts = () => {

  const { loading, error, data } = useQuery(SHOW_ALL_PRODUCTS);

  // Return variables inside of {...} to be used with this hook.
  return {
    getAllProducts: data?.showAllProducts,
    loading,
  };
};

// Export "useProducts" hook, so other components like "App.js" are able to use this hooks's content.
export default useProducts;
