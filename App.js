// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library for this component usage.
import { NativeRouter } from 'react-router-native'; // Import following components from "react-router-native" library for this component usage.
import { ApolloProvider } from '@apollo/client'; // Import "ApolloProvider" component from "@apollo/client" library for this component usage.

import createApolloClient from './src/utils/apolloClient'; // Import "createApolloClient" function content for this component usage.
import AuthStorage from './src/utils/authStorage'; // Import "AuthStorage" component (authStorage.js) for this component usage.
import AuthStorageContext from './src/contexts/AuthStorageContext'; // Import "AuthStorageContext" component (AuthStorageContext.js") for this component usage.

import Main from './src/components/Main'; // Import "Main" component (Main.jsx) for this component usage.

const authStorage = new AuthStorage(); // Define "authStorage" variable, which executes following function.
const apolloClient = createApolloClient(authStorage); // Define "apolloClient" variable, which executes following function.

// Define component called "App", which executes everything inside of {...}. Keep in mind that,
// component "Main" has all the content which app will render based on current app path and
// via "authStorage" variable, we are able to pass that data from "AuthStorageContext.Provider"
// to children => "Main" then we are able to tell that if user is logged or not and hence render
// for example login screen if user is not currently logged in.
const App = () => {
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <Main />
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  );
};

export default App;
