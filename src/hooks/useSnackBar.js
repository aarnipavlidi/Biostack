// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react'; // Import "react" library's content for this hooks usage.

const useSnackBar = () => {

  const [snackBarStatus, setSnackBarStatus] = useState(true);
  const [snackBarMessage, setSnackBarMessage] = useState('');

  const showSnackBar = (getCurrentResponse) => {
    setSnackBarMessage(getCurrentResponse);
    setSnackBarStatus(!snackBarStatus);
  };

  const removeSnackBar = () => {
    setSnackBarStatus(false)
  };

  return {
    snackBarStatus,
    snackBarMessage,
    showSnackBar,
    removeSnackBar
  };
};

// Export "useSnackBar" hook, so other components like "App.js" are able to use this hooks's content.
export default useSnackBar;
