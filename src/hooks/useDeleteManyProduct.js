// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { useMutation } from '@apollo/client'; // Import following functions from "@apollo/client" library for this hook usage.
import { SHOW_ALL_PRODUCTS, CURRENT_LOGGED_USER } from '../graphql/queries'; // Import following queries from "queries.js" file for this hook usage.
import { DELETE_ALL_PRODUCTS } from '../graphql/mutations'; // Import following mutations from "mutations.js" file for this hook usage.

const useDeleteManyProduct = () => {

  const [deleteAllProducts, { loading }] = useMutation(DELETE_ALL_PRODUCTS, {
    refetchQueries: [{
      query: SHOW_ALL_PRODUCTS,
      variables: {
        productSearchValue: ''
      }
    },
    {
      query: CURRENT_LOGGED_USER,
    }],
  });

  const deleteProductsFromDatabase = async () => {
    try {
      const response = await deleteAllProducts();
      return response.data
    } catch (error) {
      console.log(error.message)
    }
  };

  return [deleteProductsFromDatabase, { loadingDeleteProducts: loading }];
};

// Export "useDeleteManyProduct" hook, so other components like "App.js" are able to use this hook's content.
export default useDeleteManyProduct;
