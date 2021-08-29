// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { Text } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Modal, Portal } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.

import styling from '../../styling'; // Import "styling" variable from "styling.js" for this component usage.

const Checkout = ({ currentUserData, visible, hideModal }) => {

  const containerStyle = { backgroundColor: 'white' };

  // Otherwise component will render everything inside of (...) back to the user.
  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <Text>Example Modal.  Click outside this area to dismiss.</Text>
      </Modal>
    </Portal>
  );
};

// Export "Checkout" component, so other components like "App.js" are able to use this hooks's content.
export default Checkout;
