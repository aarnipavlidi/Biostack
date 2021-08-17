// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { useMutation } from '@apollo/client';
import { DELETE_CURRENT_USER } from '../graphql/mutations';

const useDeleteUser = () => {

  const [deleteCurrentUser, result] = useMutation(DELETE_CURRENT_USER);

  const deleteUserFromDatabase = async (getCurrentUserID) => {

    try {
      const response = await deleteCurrentUser({
        variables: {
          getCurrentID: getCurrentUserID
        }
      })
      return response.data
    } catch (error) {
      console.log(error.message)
    }
  };

  return [deleteUserFromDatabase, result];
};

export default useDeleteUser;
