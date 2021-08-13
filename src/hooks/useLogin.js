// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { useMutation } from '@apollo/client';
import { USER_LOGIN } from '../graphql/mutations';

// https://www.apollographql.com/docs/react/api/react/hooks/#useapolloclient
import { useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';

const useLogin = () => {

  const client = useApolloClient();
  const authStorage = useAuthStorage();

  const [getUserCredentials, result] = useMutation(USER_LOGIN, {
    onError: (error) => {
      console.log(error);
    }
  });

  const userLogin = async ({ username, password }) => {

    const response = await getUserCredentials({
      variables: {
        usernameData: username,
        passwordData: password
      }
    });

    if (response.data) {

      await authStorage.setAccessToken(response.data.login.value);

      //client.resetStore();

      return response;
    } else {

      //client.resetStore();
      throw new Error('Could not find token for this current user, please try again!');
    };
  };

  return [userLogin, result]
};

export default useLogin;
