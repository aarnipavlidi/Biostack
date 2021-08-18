// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { useMutation } from '@apollo/client'; // Import following functions from "@apollo/client" library for this hook usage.
import { DELETE_CURRENT_USER } from '../graphql/mutations'; // Import following mutations from "mutations.js" file for this hook usage.

// Define "useDeleteUser" hook, which will execute everything inside of {...}. Everytime user wants to
// delete his account from the database, this hook will be used in "UserSettings" component.
const useDeleteUser = () => {

  // Define "DELETE_CURRENT_USER" mutation and get access to "deleteCurrentUser" and "result"
  // variables. When user wants to delete his account from server, we will execute function =>
  // "deleteCurrentUser(...)" and pass variable "getCurrentUserID" to finish mutation.
  const [deleteCurrentUser, result] = useMutation(DELETE_CURRENT_USER);

  // Define "deleteUserFromDatabase" function, which will execute everything inside of {...}
  // and we pass parameter "getCurrentUserID" variable, which we will pass for "deleteCurrentUser"
  // function to finish mutation. If user deletion from the database is successful, then user
  // will be redirected back to login screen else user will get "error.message" variable data.
  const deleteUserFromDatabase = async (getCurrentUserID) => {

    // We will try first execute "try" section, if something fails during that,
    // function will execute "catch" section and tell us the reason why it failed.
    try {
      const response = await deleteCurrentUser({   // Define "response" variable, which will do following function.
        variables: {
          getCurrentID: getCurrentUserID
        }
      })
      return response.data // Is mutation is successful function will return "response.data" variable's data.
    } catch (error) {
      console.log(error.message) // Console.log "error.message" variable's data back to the user.
    }
  };

  // Return variables inside of [...] to be used with this hook.
  return [deleteUserFromDatabase, result];
};

// Export "useDeleteUser" hook, so other components like "App.js" are able to use this hooks's content.
export default useDeleteUser;
