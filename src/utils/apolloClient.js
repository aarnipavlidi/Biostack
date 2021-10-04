// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';

import { getMainDefinition } from '@apollo/client/utilities'; // Sovellus ottaa kyseisen funktion "@apollo/client/utilities" kirjaston kautta.
import { WebSocketLink } from '@apollo/client/link/ws'; // Sovellus ottaa kyseisen funktion "@apollo/client/link/ws" kirjaston kautta.

const httpLink = createHttpLink({
  uri: Constants.manifest.extra.server,
});

const wsLink = new WebSocketLink({
  uri: `ws://192.168.1.171:4000/graphql`, // Muista laittaa aikaisemmassa tehtävässä tehty palvelin erikseen päälle! :)
  options: {
    reconnect: true
  }
})

const createApolloClient = (authStorage) => {

  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
      };
    }
  });

  const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink),
)

  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
