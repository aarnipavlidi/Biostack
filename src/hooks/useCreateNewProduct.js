// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { useMutation } from '@apollo/client'; // Import following functions from "@apollo/client" library for this hook usage.
import { CREATE_NEW_PRODUCT } from '../graphql/mutations'; // Import following mutations from "mutations.js" file for this hook usage.

const useCreateNewProduct = () => {

  const [createNewProduct, result] = useMutation(CREATE_NEW_PRODUCT, {
    onError: (error) => {
      console.log(error)
    }
  });

  const submitNewProduct = async ({ productTitle, productDescription, productPrice, productGroupName, owner }) => {

    const response = await createNewProduct({
      variables: {
        productTitle: productTitle,
        productDescription: productDescription,
        productPrice: productPrice,
        productGroupName: productGroupName,
        owner: owner
      }
    });

    if (response.data) {
      return response;
    } else {
      throw new Error('Creating new product was unsuccessful, please try again!')
    };
  };

  return [submitNewProduct, result];
};

export default useCreateNewProduct;