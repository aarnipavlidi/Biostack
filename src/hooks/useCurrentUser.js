// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { CURRENT_LOGGED_USER } from '../graphql/queries';

const useCurrentUser = () => {

  const [currentUserData, setCurrentUserData] = useState();
  console.log(currentUserData);
  const { loading, error, data } = useQuery(CURRENT_LOGGED_USER);

  useEffect(() => {
    if (data) {
      setCurrentUserData(data.me)
    }
  }, [data]);

  return { currentUserData, loading }
};

export default useCurrentUser;
