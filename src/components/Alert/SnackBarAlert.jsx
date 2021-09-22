// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { Snackbar } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.

import styling from '../../styling'; // Import "styling" variable from "styling.js" for this component usage.

const SnackBarAlert = ({ snackBarStatus, snackBarMessage, removeSnackBar }) => {

  return (
    <Snackbar
      visible={snackBarStatus}
      onDismiss={removeSnackBar}
      action={{
      label: 'Undo',
      onPress: () => {
                  // Do something
        },
      }}>
      {snackBarMessage}
    </Snackbar>
  );
};

// Export "SnackBarAlert" component, so other components like "App.js" are able to use this hooks's content.
export default SnackBarAlert;
