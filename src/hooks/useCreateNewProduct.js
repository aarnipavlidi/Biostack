// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { useMutation } from '@apollo/client'; // Import following functions from "@apollo/client" library for this hook usage.
import { CREATE_NEW_PRODUCT } from '../graphql/mutations'; // Import following mutations from "mutations.js" file for this hook usage.
import { SHOW_ALL_PRODUCTS, CURRENT_LOGGED_USER } from '../graphql/queries'; // Import following queries from "queries.js" file for this hook usage.

// Define "useCreateNewProduct" hook, which will execute everything inside of {...}, so everytime
// user wants to add new item to the app via "NewProduct" component, this hook will be referenced.
// When user has typed required input fields and ready to submit new item to the database, hook
// will execute "submitNewProduct" function and do "CREATE_NEW_PRODUCT" mutation with given
// parameter values. After mutation has been done we will refetch "CURRENT_LOGGED_USER" query,
// so that newly listed item will be shown at users profile page.
const useCreateNewProduct = () => {

  // Define "CREATE_NEW_PRODUCT" mutation and use variables inside of [...] to be
  // used within following mutation. When we want to execute mutation, we can use
  // "createNewProduct" variable to execute and return data back after it's done.
  const [createNewProduct, { data, loading, error }] = useMutation(CREATE_NEW_PRODUCT, {
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

  // Define "submitNewProduct" function, which will execute everything inside of {...}, so basically
  // everytime user wants to add new item to the app, this function will be executed by the parameter
  // values, which comes from input fields where user types new item information.
  const submitNewProduct = async ({ productTitle, productDescription, productSize, productPrice, productGroupName, owner }) => {

    // Define "response" variable, which will execute "createNewProduct" function
    // with parameter values from "submitNewProduct".
    const response = await createNewProduct({
      variables: {
        productTitle: productTitle,
        productDescription: productDescription,
        productSize: productSize,
        productPrice: productPrice,
        productGroupName: productGroupName,
        owner: owner
      }
    });

    // If mutation execution is successful, "response.data" will be true and
    // we will return "response" variable data back to the user.
    if (response.data) {
      return response;
      // Otherwise if condition fails, which means "response.date" is false,
      // then we will return "error message" back to the user.
    } else {
      throw new Error('Creating new product was unsuccessful, please try again!')
    };
  };

  // Return variables inside of [...] to be used with this hook.
  return [submitNewProduct, { loading }];
};

// Export "useCreateNewProduct" hook, so other components like "App.js" are able to use this hook's content.
export default useCreateNewProduct;
