// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { View, StyleSheet, Text } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Button } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.

import styling from '../../../styling'; // Import "styling" variable from "styling.js" for this component usage.

const userInformationContainer = StyleSheet.create({
  buttonElement: {
    flex: 1,
    marginTop: 10,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});

const FormButtons = ({ currentFormValues, onSubmit, loading, resetAccountValues }) => {

  if (currentFormValues.userName.length !== 0 || currentFormValues.userEmail.length !== 0) {
    return (
      <View style={userInformationContainer.buttonElement}>
        <Button style={{ flex: 0.35 }} color={styling.colors.Asphalt} mode="contained" onPress={onSubmit} loading={loading}>
          <Text style={{ fontFamily: styling.fonts.buttonContent }}>{loading ? 'Loading' : 'Confirm'}</Text>
        </Button>
        <Button style={{ flex: 0.35 }} color={styling.colors.Asphalt} mode="contained" onPress={resetAccountValues}>
          <Text style={{ fontFamily: styling.fonts.buttonContent }}>Cancel</Text>
        </Button>
      </View>
    )
  } else {
    return null
  };
};

export default FormButtons;
