// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this hooks usage.
import { useParams } from 'react-router-native'; // Import following components from "react-router-native" library's content for this component usage.
import { useQuery } from '@apollo/client'; // Import following functions from "@apollo/client" library for this hook usage.
import { SHOW_CURRENT_PRODUCT } from '../graphql/queries'; // Import following queries from "queries.js" file for this hook usage.

const useCurrentProduct = () => {

  const { id } = useParams();

  const { loading, error, data } = useQuery(SHOW_CURRENT_PRODUCT, {
    fetchPolicy: 'cache-and-network',
    variables: {
      getProductID: id
    },
  });
  
  // Return variables inside of {...} to be used with this hook.
  return {
    getCurrentProduct: data?.showCurrentProduct,
    loading,
  };
};

// Export "useCurrentProduct" hook, so other components like "App.js" are able to use this hooks's content.
export default useCurrentProduct;
