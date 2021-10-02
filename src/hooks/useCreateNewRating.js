// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { useMutation } from '@apollo/client'; // Import following functions from "@apollo/client" library for this hook usage.
import { GIVE_RATING_USER } from '../graphql/mutations'; // Import following mutations from "mutations.js" file for this hook usage.
import { SHOW_ALL_PRODUCTS, CURRENT_LOGGED_USER } from '../graphql/queries'; // Import following queries from "queries.js" file for this hook usage.

const useCreateNewRating = () => {

  const [giveRatingCurrentUser, { data, loading, error }] = useMutation(GIVE_RATING_USER, {
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

  const submitNewRating = async (getTransactionID, getRatingValue, getTypeValue) => {

    const response = await giveRatingCurrentUser({
      variables: {
        getCurrentTransactionID: getTransactionID,
        getRatingValue: getRatingValue,
        getTransactionType: getTypeValue,
      }
    });

    if (response.data) {
      return response;
      console.log(response.data.createTransaction);
    } else {
      throw new Error('Giving rating was unsuccessful, please try again later!')
    };
  };

  return [submitNewRating, { loadingRating: loading }];
};

// Export "useCreateNewRating" hook, so other components like "App.js" are able to use this hook's content.
export default useCreateNewRating;
