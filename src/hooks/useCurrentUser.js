// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState, useEffect } from 'react'; // Import "react" library's content for this hooks usage.
import { useQuery } from '@apollo/client'; // Import following functions from "@apollo/client" library for this hook usage.
import { CURRENT_LOGGED_USER } from '../graphql/queries'; // Import following queries from "queries.js" file for this hook usage.

// Define "useCurrentUser" hook, which will execute everything inside of {...}. Everytime user has
// logged in to the app successfully, then app will know via "CURRENT_LOGGED_USER" query that who
// is currently logged in to the app. We are using hook at "Main" component, so then we are able
// to pass query's data to to other children of "Main" component's if there is requirement for it.
const useCurrentUser = () => {

  const [currentUserData, setCurrentUserData] = useState(); // Define "currentUserData" variable into state.

  // Define { loading, error, data } variables for executing "CURRENT_LOGGED_USER"
  // query. If query is successfully (so user is currently logged in to the app) then
  // query will return data into "data" variable and if query is loading, so basically
  // still fetching/searching data from database then we can use "loading" variable
  // to render for example "loading spinner" back to the user untill data has loaded.
  const { loading, error, data } = useQuery(CURRENT_LOGGED_USER);

  console.log(data);

  // Define "useEffect(...)" function, which will be executed everytime there is change
  // in "data" variable. So when user has logged in to the app successfully, we will wait
  // until query has returned data and then will change state of "currentUserData"
  // variable into => "data.me" variable.
  useEffect(() => {
    if (data) {
      setCurrentUserData(data.me)
    }
  }, [data]);

  // Return variables inside of {...} to be used with this hook.
  return { currentUserData, loading }
};

// Export "useCurrentUser" hook, so other components like "App.js" are able to use this hooks's content.
export default useCurrentUser;
