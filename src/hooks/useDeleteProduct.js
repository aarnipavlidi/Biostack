// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { useMutation } from '@apollo/client'; // Import following functions from "@apollo/client" library for this hook usage.
import { SHOW_ALL_PRODUCTS, CURRENT_LOGGED_USER } from '../graphql/queries'; // Import following queries from "queries.js" file for this hook usage.
import { DELETE_CURRENT_PRODUCT } from '../graphql/mutations'; // Import following mutations from "mutations.js" file for this hook usage.

// Define "useDeleteProduct" hook, which will execute everything inside of {...},
// whenever hook is being referenced. When user wants to delete one of the items
// from the app, then this hook will be used to do so. After deletion has beeen
// successful (no errors from mutation), then we will refetch active querys =>
// "SHOW_ALL_PRODUCTS" and "CURRENT_LOGGED_USER", this way app will show "latest"
// data back to the user at homepage (Dashboard) profile (UserSettings).
const useDeleteProduct = () => {

  // Define "DELETE_CURRENT_PRODUCT" mutation and variables inside of [...].
  const [deleteCurrentProduct, result] = useMutation(DELETE_CURRENT_PRODUCT, {
    refetchQueries: [{
      query: SHOW_ALL_PRODUCTS,
    },
    {
      query: CURRENT_LOGGED_USER,
    }]
  });

  // Define variable "deleteProductFromDatabase", which will execute everything inside of
  // {...} whenever function is being referenced. Function will get access to parameter
  // value of "getCurrentProductID", which will be used for doing mutation, because
  // mutation is expecting "id" of chosen product, so backend will know which value
  // need's to be deleted from the database. If mutation is successful then function
  // will return back "response.data", otherwise if there are any problems, then
  // function will execute "catch" section and will console.log "error.message" data.
  const deleteProductFromDatabase = async (getCurrentProductID) => {
    try {
      const response = await deleteCurrentProduct({
        variables: {
          getCurrentID: getCurrentProductID
        }
      });

      return response.data // Return "response.data" variable back to the user.
    } catch (error) { // If there are any problems while doing function, we will execute "catch" section.
      console.log(error.message) // Console.log "error.message" variable back to the user.
    }
  };

  // Return variables inside of [...] to be used with this hook.
  return [deleteProductFromDatabase, result];
};

// Export "useDeleteProduct" hook, so other components like "App.js" are able to use this hook's content.
export default useDeleteProduct;
