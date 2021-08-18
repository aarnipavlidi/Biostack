// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

// https://www.apollographql.com/docs/react/api/react/hooks/#useapolloclient
import { useApolloClient, useMutation } from '@apollo/client'; // Import following functions from "@apollo/client" library for this hook usage.
import { USER_LOGIN } from '../graphql/mutations'; // Import following mutations from "mutations.js" file for this hook usage.

import useAuthStorage from '../hooks/useAuthStorage'; // Import "useAuthStorage" hook from "useAuthStorage.js" file for this hook usage.

// Define "useLogin" hook, which will execute everything inside of {...}. Everytime user wants to
// login to the app, this hook will be used in "LoginScreen" component.
const useLogin = () => {

  const client = useApolloClient(); // Define "client" variable, which is equal to "useApolloClient(...)" function.
  const authStorage = useAuthStorage(); // Define "authStorage" variable, which is equal to "useAuthStorage(...)" function.

  // Define "USER_LOGIN" mutation and get access to "getUserCredentials" and "result"
  // variables. When user wants to login to the app, we will execute "getUserCredentials(...)"
  // function with the variables which user gave into input fields. If logging is successful
  // aka mutation then user will be redirected to dashboard.
  const [getUserCredentials, result] = useMutation(USER_LOGIN);

  // Define "userLogin" function, which will execute everything inside of {...},
  // so basically user gives values to input fields (LoginScreen component) and
  // and with those values we pass for this function parameters and execute
  // mutation => "getUserCredentials(...)" => "USER_LOGIN". If logging to the app
  // is successful, then we will set token value (response.data.login.value) to
  // authStorage and then reset store by using "client.resetStore(...)" functions.
  // We do this, because we don't want mutation to "stay active" after user has
  // either successfully or unsuccessfully logged in to the app.
  const userLogin = async ({ username, password }) => {

    // Define "response" variable, which will do following function.
    const response = await getUserCredentials({
      variables: {
        usernameData: username,
        passwordData: password
      }
    });

    // If "response.data" is true, which means it has data then we will
    // execute everything inside of {...} and else if variable is "false"
    // then we will execute "else" section.
    if (response.data) {
      await authStorage.setAccessToken(response.data.login.value); // Add current logged user "token" value to => "authStorage".
      client.resetStore(); // Clear mutation from "active" and refetch all other active queries again.
      return response.data; // Return "response.data" variable back to the user.
    } else {
      client.resetStore(); // Clear mutation from "active" and refetch all other active queries again.
      return null; // Return nothing "null" back for the user.
    };
  };

  // Return variables inside of [...] to be used with this hook.
  return [userLogin, result]
};

// Export "useLogin" hook, so other components like "App.js" are able to use this hooks's content.
export default useLogin;
