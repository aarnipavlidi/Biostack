// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { useMutation } from '@apollo/client'; // Import following functions from "@apollo/client" library for this hook usage.
import { CURRENT_LOGGED_USER } from '../graphql/queries'; // Import following queries from "queries.js" file for this hook usage.
import { UPDATE_USER } from '../graphql/mutations'; // Import following mutations from "mutations.js" file for this hook usage.

const useUpdateUser = () => {

  const [updateUserValue, { loading }] = useMutation(UPDATE_USER, {
    refetchQueries: [{
      query: CURRENT_LOGGED_USER
    }],
  });

  const updateCurrentUser = async ({ userName, userEmail }) => {
    try {
      const response = await updateUserValue({
        variables: {
          getNameValue: userName,
          getEmailValue: userEmail,
        }
      });
      return response.data
    } catch (error) {
      console.log(error.message)
    };
  };

  return [updateCurrentUser, { loadingUpdateUser: loading }];
};

// Export "useUpdateUser" hook, so other components like "App.js" are able to use this hook's content.
export default useUpdateUser;
