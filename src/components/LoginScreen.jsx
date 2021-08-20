// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { Alert, View, Pressable, Text, StyleSheet } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { useHistory } from 'react-router-native'; // Import following functions from "react-router-native" library's content for this component usage.

import useAuthStorage from '../hooks/useAuthStorage'; // Import "useAuthStorage" hook from "useAuthStorage.js" file for this component usage.

import styling from '../styling'; // Import "styling" variable from "styling.js" for this component usage.
import FormikTextInput from './FormikTextInput'; // Import "FormikTextInput" component from "FormikTextInput.jsx" for this component usage.

import { Formik } from 'formik'; // Import "Formik" component from "formik" libary's content for this component usage.
import * as yup from 'yup'; // Import everything as "yup" from "yup" libary's content for this component usage.

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
    width: '90%',
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

// Define "initialValues" variable, which will get inside of {...}
// objects values as default (''). Which means, if user wants to
// submit form without changing any input fields, these objects
// will get those default values and passed to database. But
// because we have validation setupped, that won't be possible! :)
const initialValues = {
  username: '',
  password: ''
};

// Define "loginFormValidationSchema" variable, which will execute
// validation via "yup" variable, when user wants to create new user to
// the app. If some of the input fields don't match with required condition,
// then function will return "error message" under of that current input field.
const loginFormValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required.'),
  password: yup
    .string()
    .required('Password is required.')
});

const LoginForm = ({ history, onSubmit }) => {

  const goRegistration = () => {
    history.push("/register")
  };

  return (
    <View>
      <FormikTextInput name="username" placeholder="Please enter your username." />
      <FormikTextInput name="password" placeholder="Please enter your password." secureTextEntry={true} />
      <View style={buttonContainer.container}>
        <Pressable style={buttonContainer.buttonContent} onPress={onSubmit}>
          <Text style={buttonContainer.buttonContentText}>Sign In</Text>
        </Pressable>
        <Pressable style={buttonContainer.buttonContent} onPress={goRegistration}>
          <Text style={buttonContainer.buttonContentText}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

const LoginScreen = ({ setCurrentToken }) => {

  const [userLogin] = useLogin(); // Define "userLogin" variable from => "useLogin(...)" hook.
  const history = useHistory(); // Define "history" variable, which will execute => "useHistory(...)" function.

  const authStorage = useAuthStorage();

  const onSubmit = async (values, { resetForm }) => {

    const { username, password } = values;

    try {
      const { data } = await userLogin({ username, password });
      const response = await authStorage.getAccessToken();
      setCurrentToken(response);
      resetForm();
      history.push("/dashboard");
    } catch (error) {
      resetForm();
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
        <Text style={titleContainer.containerText}>Place where you can sell or buy second hand clothes with other people.</Text>
      </View>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={loginFormValidationSchema}>
        {({ handleSubmit }) => <LoginForm history={history} onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default LoginScreen;
