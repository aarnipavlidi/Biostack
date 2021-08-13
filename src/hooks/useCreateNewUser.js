// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { useMutation } from '@apollo/client';
import { CREATE_NEW_USER } from '../graphql/mutations';

const useCreateNewUser = () => {

  const [createNewUser, result] = useMutation(CREATE_NEW_USER);

  const userRegistration = async ({ name, username, password, email }) => {

    const response = await createNewUser({
      variables: {
        nameData: name,
        usernameData: username,
        passwordData: password,
        emailData: email
      }
    });

    if (response.data) {
      return response;
    } else {
      throw new Error('Creating new user was unsuccessful, please try again!');
    };
  };


  return [userRegistration, result];
};

export default useCreateNewUser;
