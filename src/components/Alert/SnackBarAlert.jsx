// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { StyleSheet, Text } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Snackbar } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.

import styling from '../../styling'; // Import "styling" variable from "styling.js" for this component usage.

const snackBarContainer = StyleSheet.create({
  container: {
    backgroundColor: styling.colors.Asphalt,
  },
  content: {
    color: styling.colors.VistaWhite,
    fontFamily: styling.fonts.buttonContent,
    fontSize: 12,
  },
});

const SnackBarAlert = ({ snackBarStatus, snackBarMessage, removeSnackBar }) => {

  return (
    <Snackbar
      visible={snackBarStatus}
      duration={5000}
      theme={{ colors: { accent: '#C2C2C0' }, animation: { scale: 3.2 }}}
      onDismiss={removeSnackBar}
      style={snackBarContainer.container}
      action={{
      label: 'OK'
      }}>
      <Text style={snackBarContainer.content}>{snackBarMessage}</Text>
    </Snackbar>
  );
};

// Export "SnackBarAlert" component, so other components like "App.js" are able to use this hooks's content.
export default SnackBarAlert;
