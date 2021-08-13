// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react';
import { Platform, View, Pressable, Text, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';

import styling from '../styling';
import FormikTextInput from './FormikTextInput';

import { Formik } from 'formik';
import * as yup from 'yup'

import useLogin from '../hooks/useLogin';

const container = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: 'white',
    height: '100%'
  }
});

const inputContainer = StyleSheet.create({
  container: {
    marginTop: 5,
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '81%',
    marginTop: 15,
    height: 40,
    backgroundColor: '#808080',
    borderWidth: 3,
    borderColor: '#989898'
  },
  buttonContentText: {
    marginTop: 5,
    color: 'white',
    fontFamily: Platform.select({
      android: styling.fonts.android,
      ios: styling.fonts.ios,
      default: styling.fonts.default
    }),
  }
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
    <View style={inputContainer.container}>
      <FormikTextInput name="username" placeholder="Enter your username..." />
      <FormikTextInput name="password" placeholder="Enter your password..." secureTextEntry={true} />
      <Pressable style={inputContainer.buttonContent} onPress={onSubmit}>
        <Text style={inputContainer.buttonContentText}>LOG IN</Text>
      </Pressable>
    </View>
  );
};


const LoginScreen = () => {

  const history = useHistory();
  const [userLogin] = useLogin();

  const onSubmit = async (values) => {

    const { username, password } = values;

    try {

      const { data } = await userLogin({ username, password });
      //history.push('/');
      console.log(data.login.value);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={container.container}>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={loginFormValidationSchema}>
        {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default LoginScreen;
