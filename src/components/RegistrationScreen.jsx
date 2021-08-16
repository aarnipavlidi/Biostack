// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react';
import { Alert, View, Pressable, Text, StyleSheet } from 'react-native';

import { useHistory } from 'react-router-native';

import styling from '../styling';
import FormikTextInput from './FormikTextInput';

import { Formik } from 'formik';
import * as yup from 'yup';

import useCreateNewUser from '../hooks/useCreateNewUser';

const container = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'stretch',
    backgroundColor: '#Fdfcfa',
    justifyContent: 'center',
  },
});

const titleContainer = StyleSheet.create({
  container: {
    marginBottom: 15,
    alignItems: 'center'
  },
  containerTitle: {
    textAlign: 'center',
    color: styling.colors.Asphalt,
    fontFamily: styling.fonts.android,
    fontWeight: styling.fontWeights.bold,
    fontSize: styling.fontSizes.title,
  },
  containerText: {
    textAlign: 'center',
    color: styling.colors.Asphalt,
    fontFamily: styling.fonts.android,
    fontWeight: styling.fontWeights.normal,
    fontSize: styling.fontSizes.subheading,
  }
});

const buttonContainer = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContent: {
    flexGrow: 1,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    height: 40,
    backgroundColor: styling.colors.Asphalt,
    borderWidth: 3,
    borderColor: styling.colors.Asphalt,
  },
  buttonContentText: {
    marginTop: 5,
    textAlign: 'center',
    color: styling.colors.VistaWhite
  },
});

const initialValues = {
  name: '',
  username: '',
  password: '',
  passwordConfirm: '',
  email: ''
};

const registrationFormValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required.'),
  username: yup
    .string()
    .min(5, 'Username has to be minimum of 5 characters.')
    .required('Username is required.'),
  password: yup
    .string()
    .required('Password is required.'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match.')
    .required('Confirmation for password is required.'),
  email: yup
    .string()
    .email('Invalid email format.')
    .required('Email is required.')
});

const RegistrationForm = ({ history, onSubmit }) => {

  const cancelRegistration = () => {
    history.push("/")
  };

  return (
    <View>
      <FormikTextInput name="name" placeholder="Please enter your name." />
      <FormikTextInput name="username" placeholder="Please enter your username." />
      <FormikTextInput name="password" placeholder="Please enter your password." />
      <FormikTextInput name="passwordConfirm" placeholder="Please confirm your password." />
      <FormikTextInput name="email" placeholder="Please enter your email." />
      <View style={buttonContainer.container}>
        <Pressable style={buttonContainer.buttonContent} onPress={cancelRegistration}>
          <Text style={buttonContainer.buttonContentText}>Cancel</Text>
        </Pressable>
        <Pressable style={buttonContainer.buttonContent} onPress={onSubmit}>
          <Text style={buttonContainer.buttonContentText}>Register</Text>
        </Pressable>
      </View>
    </View>
  );
};

const RegistrationScreen = () => {

  const [userRegistration] = useCreateNewUser();
  const history = useHistory();

  const onSubmit = async (values) => {

    const { name, username, password, email } = values;

    try {
      const { data } = await userRegistration({ name, username, password, email });
      history.push("/");
    } catch (error) {
      Alert.alert(
        "Biostack",
        `${error.message}`,
        [
          {
            text: "BACK",
            style: "cancel"
          },
        ]
      );
    };
  };

  return (
    <View style={container.container}>
      <View style={titleContainer.container}>
        <Text style={titleContainer.containerTitle}>Biostack</Text>
        <Text style={titleContainer.containerText}>Register an account for app.</Text>
      </View>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={registrationFormValidationSchema}>
        {({ handleSubmit }) => <RegistrationForm history={history} onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default RegistrationScreen;
