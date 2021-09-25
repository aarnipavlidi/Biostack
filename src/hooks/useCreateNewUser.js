// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { useMutation } from '@apollo/client'; // Import following functions from "@apollo/client" library for this hook usage.
import { CREATE_NEW_USER } from '../graphql/mutations'; // Import following mutations from "mutations.js" file for this hook usage.

// Define "useCreateNewUser" hook, which will execute everything inside of {...}. Everytime
// user wants to create new user this hook will be used at "RegistrationScreen" component.
const useCreateNewUser = () => {

  // Define "CREATE_NEW_USER" mutation and [createNewUser, result] variables.
  // With "createNewUser" function we will be able to execute mutation with
  // variables from input fields user gave, while creating new user to db.
  const [createNewUser, { loading }] = useMutation(CREATE_NEW_USER);

  // Define "userRegistration" function, which will execute everything inside of
  // {...} and also it get's parameters values inside of ({...}), which comes from
  // input fields where user is typing new account information. Those parameters
  // we pass for mutation => "createNewUser(...)" and if creating new user is
  // successful, then user will be able to log in to the application. Otherwise
  // user get's an error via "Alert" method and reason why creation failed.
  const userRegistration = async ({ name, username, password, email }) => {

    // Define "response" variable, which will do following function.
    const response = await createNewUser({
      variables: {
        nameData: name,
        usernameData: username,
        passwordData: password,
        emailData: email
      }
    });

    // If mutation is successful, then "response.data" is true and we will return back "response" variable data.
    if (response.data) {
      return response;
    } else { // Else if mutation is unsuccessful, then we will return error with following message.
      throw new Error('Creating new user was unsuccessful, please try again!');
    };
  };

  // Return variables inside of [...] to be used with this hook.
  return [userRegistration, { loading }];
};

// Export "useCreateNewUser" hook, so other components like "App.js" are able to use this hooks's content.
export default useCreateNewUser;
