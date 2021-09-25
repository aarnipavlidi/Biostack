// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react'; // Import "react" library's content for this component usage.
import { ScrollView, View, StyleSheet, Text } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { TextInput, Card, Button } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.

import SelectedOption from './SelectedOption'; // Import "SelectedOption" component from "SelectedOption.jsx" file for this component usage.
import FormButtons from './FormButtons'; // Import "FormButtons" component from "FormButtons.jsx" file for this component usage.
import FormikTextInput from '../../PaperTextInput/FormikTextInput'; // Import "FormikTextInput" component from "FormikTextInput.jsx" for this component usage.

import styling from '../../../styling'; // Import "styling" variable from "styling.js" for this component usage.

const userInformationContainer = StyleSheet.create({
  title: {
    marginTop: 15,
    marginBottom: 10,
    width: '50%',
    backgroundColor: styling.colors.VistaWhite,
    alignSelf: 'center',
    elevation: 10,
  },
  titleContent: {
    fontFamily: styling.fonts.buttonContent,
    padding: 5,
    textAlign: 'center',
    color: styling.colors.Asphalt
  },
  newValueElement: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputElement: {
    flex: 0.8
  },
});

const EditAccountForm = ({ currentFormValues, nameValue, setNameValue, emailValue, setEmailValue, currentUserData, onSubmit, loading, resetAccountValues }) => {

  return (
    <View>
      <Card style={userInformationContainer.title}>
        <Text style={userInformationContainer.titleContent}>YOUR INFORMATION</Text>
      </Card>
      <View style={userInformationContainer.newValueElement}>
        <View style={userInformationContainer.inputElement}>
          <FormikTextInput
            disabled={nameValue.status === false ? true : false}
            label="Edit personal name."
            name="userName"
            placeholder={currentUserData.name}
          />
        </View>
        <SelectedOption accountValue={nameValue} setAccountValue={setNameValue} />
      </View>
      <View style={userInformationContainer.newValueElement}>
        <View style={userInformationContainer.inputElement}>
          <FormikTextInput
            disabled={emailValue.status === false ? true : false}
            label="Edit personal email."
            name="userEmail"
            placeholder={currentUserData.email}
          />
        </View>
        <SelectedOption accountValue={emailValue} setAccountValue={setEmailValue} />
      </View>
      <FormButtons currentFormValues={currentFormValues} onSubmit={onSubmit} loading={loading} resetAccountValues={resetAccountValues} />
    </View>
  );
};

// Export "EditAccountForm" component, so other components like "App.js" are able to use this hooks's content.
export default EditAccountForm;
