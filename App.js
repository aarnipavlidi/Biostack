import React from 'react';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';

import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage'; // Alustetaan "AuthStorage" funktio, joka hyödyntää "authStorage.js" tiedoston sisältöä sovelluksen aikana.
import AuthStorageContext from './src/contexts/AuthStorageContext'; // Alustetaan "AuthStorageContext" funktio, joka hyödyntää "AuthStorageContext.js" tiedoston sisältöä sovelluksen aikana.

import Main from './src/components/Main';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

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
