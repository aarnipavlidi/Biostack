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

  const [getUserCredentials, result] = useMutation(USER_LOGIN);

  const userLogin = async ({ username, password }) => {

    const response = await getUserCredentials({
      variables: {
        usernameData: username,
        passwordData: password
      }
    });

    if (response.data) {
      await authStorage.setAccessToken(response.data.login.value);
      return response.data;
    } else {
      return null;
    };
  };

  return [userLogin, result]
};

export default useLogin;
