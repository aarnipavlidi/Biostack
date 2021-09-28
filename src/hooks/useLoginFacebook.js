// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

// https://www.apollographql.com/docs/react/api/react/hooks/#useapolloclient
import { useApolloClient, useMutation } from '@apollo/client'; // Import following functions from "@apollo/client" library for this hook usage.
import { USER_LOGIN_FACEBOOK } from '../graphql/mutations'; // Import following mutations from "mutations.js" file for this hook usage.

import useAuthStorage from '../hooks/useAuthStorage'; // Import "useAuthStorage" hook from "useAuthStorage.js" file for this hook usage.

const useLoginFacebook = () => {

  const client = useApolloClient(); // Define "client" variable, which is equal to "useApolloClient(...)" function.
  const authStorage = useAuthStorage(); // Define "authStorage" variable, which is equal to "useAuthStorage(...)" function.

  const [getUserCredentials, { loading }] = useMutation(USER_LOGIN_FACEBOOK);

  const userLoginFacebook = async (userID, userAvatar, userEmail, userName, userUsername) => {

    // Define "response" variable, which will do following function.
    const response = await getUserCredentials({
      variables: {
        facebookID: userID,
        facebookAvatar: userAvatar,
        facebookEmail: userEmail,
        facebookName: userName,
        facebookUsername: userUsername
      }
    });

    if (response.data) {
      await authStorage.setAccessToken(response.data.facebookLogin.value); // Add current logged user "token" value to => "authStorage".
      client.resetStore(); // Clear mutation from "active" and refetch all other active queries again.
      return response.data; // Return "response.data" variable back to the user.
    } else {
      client.resetStore(); // Clear mutation from "active" and refetch all other active queries again.
      return null; // Return nothing "null" back for the user.
    };
  };

  // Return variables inside of [...] to be used with this hook.
  return [userLoginFacebook, { facebookLoading: loading }]
};

// Export "useLoginFacebook" hook, so other components like "App.js" are able to use this hooks's content.
export default useLoginFacebook;
