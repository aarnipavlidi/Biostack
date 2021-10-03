// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { useMutation } from '@apollo/client'; // Import following functions from "@apollo/client" library for this hook usage.
import { CREATE_NEW_TRANSACTION } from '../graphql/mutations'; // Import following mutations from "mutations.js" file for this hook usage.
import { SHOW_ALL_PRODUCTS, CURRENT_LOGGED_USER } from '../graphql/queries'; // Import following queries from "queries.js" file for this hook usage.

const useCreateNewTransaction = () => {

  const [createNewTransaction, { data, loading, error }] = useMutation(CREATE_NEW_TRANSACTION, {
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

  const submitNewTransaction = async ({ getOrderData }) => {

    const response = await createNewTransaction({
      variables: {
        date: getOrderData.date,
        productID: getOrderData.productID,
        productTitle: getOrderData.productTitle,
        productSize: getOrderData.productSize,
        productPrice: getOrderData.productPrice,
        productType: getOrderData.productType,
        productImage: getOrderData.productImage,
        sellerID: getOrderData.sellerID,
        sellerName: getOrderData.sellerName,
        sellerEmail: getOrderData.sellerEmail,
        sellerCity: getOrderData.location.city,
        sellerRegionID: getOrderData.location.region_id,
        sellerLatitude: getOrderData.location.latitude,
        sellerLongitude: getOrderData.location.longitude,
        shippingMethod: getOrderData.shippingMethod,
        paymentMethod: getOrderData.paymentMethod,
        paymentTotal: getOrderData.paymentTotal
      }
    });

    if (response.data) {
      return response;
      console.log(response.data.createTransaction);
    } else {
      throw new Error('Buying current product was unsuccessful, please try again!')
    };
  };

  return [submitNewTransaction, { loading }];
};

// Export "useCreateNewTransaction" hook, so other components like "App.js" are able to use this hook's content.
export default useCreateNewTransaction;
