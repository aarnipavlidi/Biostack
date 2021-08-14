// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react';
import { Platform, View, Pressable, Text, StyleSheet, Button } from 'react-native';

import { useHistory } from 'react-router-native';
import useAuthStorage from '../hooks/useAuthStorage';

import styling from '../styling';
import FormikTextInput from './FormikTextInput';

import { Formik } from 'formik';
import * as yup from 'yup'

import useLogin from '../hooks/useLogin';

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
  username: '',
  password: ''
};

const loginFormValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required.'),
  password: yup
    .string()
    .required('Password is required.')
});

const LoginForm = ({ onSubmit }) => {

  return (
    <View>
      <FormikTextInput name="username" placeholder="Enter your username..." />
      <FormikTextInput name="password" placeholder="Enter your password..." secureTextEntry={true} />

      <View style={buttonContainer.container}>

        <Pressable style={buttonContainer.buttonContent} onPress={onSubmit}>
          <Text style={buttonContainer.buttonContentText}>Sign In</Text>
        </Pressable>

        <Pressable style={buttonContainer.buttonContent} onPress={onSubmit}>
          <Text style={buttonContainer.buttonContentText}>Sign Up</Text>
        </Pressable>

      </View>

    </View>
  );
};


const LoginScreen = ({ setCurrentToken }) => {

  const history = useHistory();
  const [userLogin] = useLogin();

  const authStorage = useAuthStorage();

  const onSubmit = async (values) => {

    const { username, password } = values;

    try {

      const { data } = await userLogin({ username, password });
      const response = await authStorage.getAccessToken();
      setCurrentToken(response);
      //history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={container.container}>
      <View style={titleContainer.container}>
        <Text style={titleContainer.containerTitle}>Biostack</Text>
        <Text style={titleContainer.containerText}>Place where you can sell or buy second hand clothes with other people.</Text>
      </View>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={loginFormValidationSchema}>
        {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default LoginScreen;
