// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react'; // Import "react" library's content for this component usage.
import { View, Text, StyleSheet } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Modal, Portal, } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.

import styling from '../../../styling'; // Import "styling" variable from "styling.js" for this component usage.

const modal = StyleSheet.create({
  mainContainer: {
    backgroundColor: styling.colors.VistaWhite,
    marginTop: -75,
    marginLeft: 10,
    marginRight: 10,
  },
});

const ContactPerson = ({ visible, hideModal }) => {

  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={modal.mainContainer}>
        <Text>sadasdsa</Text>
      </Modal>
    </Portal>
  );
};

// Export "ContactPerson" component, so other components like "App.js" are able to use this hooks's content.
export default ContactPerson;
