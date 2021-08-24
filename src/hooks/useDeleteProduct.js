// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { useMutation } from '@apollo/client'; // Import following functions from "@apollo/client" library for this hook usage.
import { SHOW_ALL_PRODUCTS, CURRENT_LOGGED_USER } from '../graphql/queries'; // Import following queries from "queries.js" file for this hook usage.
import { DELETE_CURRENT_PRODUCT } from '../graphql/mutations'; // Import following mutations from "mutations.js" file for this hook usage.

const useDeleteProduct = () => {

  const [deleteCurrentProduct, result] = useMutation(DELETE_CURRENT_PRODUCT, {
    refetchQueries: [{
      query: SHOW_ALL_PRODUCTS,
    },
    {
      query: CURRENT_LOGGED_USER,
    }]
  });

  const deleteProductFromDatabase = async (getCurrentProductID) => {

    try {
      const response = await deleteCurrentProduct({
        variables: {
          getCurrentID: getCurrentProductID
        }
      });

      return response.data
    } catch (error) {
      console.log(error.message)
    }
  };

  // Return variables inside of [...] to be used with this hook.
  return [deleteProductFromDatabase, result];
};

// Export "useDeleteProduct" hook, so other components like "App.js" are able to use this hook's content.
export default useDeleteProduct;
