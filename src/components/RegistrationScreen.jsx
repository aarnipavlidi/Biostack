// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { Alert, View, Pressable, Text, StyleSheet } from 'react-native'; // Import following components from "react-native" library for this component usage.

import { useHistory } from 'react-router-native'; // Import following functions from "react-router-native" library's content for this component usage.

import styling from '../styling'; // Import "styling" variable from "styling.js" for this component usage.
import FormikTextInput from './FormikTextInput'; // Import "FormikTextInput" component from "FormikTextInput.jsx" for this component usage.

import { Formik } from 'formik'; // Import "Formik" component from "formik" libary's content for this component usage.
import * as yup from 'yup'; // Import everything as "yup" from "yup" libary's content for this component usage.

import useCreateNewUser from '../hooks/useCreateNewUser'; // Import "useCreateNewUser" hook from "useCreateNewUser.js" file for this component usage.

// Define "container" variable, which will be used as "main container"
// for styling "RegistrationScreen" component.
const container = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'stretch',
    backgroundColor: '#Fdfcfa',
    justifyContent: 'center',
  },
});

// Define "titleContainer" variable, which will be used for styling
// text (title etc.) before input fields.
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

// Define "buttonContainer" variable, which will be used for styling
// buttons "container" after input fields.
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
  name: '',
  username: '',
  password: '',
  passwordConfirm: '',
  email: ''
};

// Define "registrationFormValidationSchema" variable, which will execute
// validation via "yup" variable, when user wants to create new user to
// the app. If some of the input fields don't match with required condition,
// then function will return "error message" under of that current input field.
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

// Define "RegistrationForm" component, which will execute everything inside of {...},
// component will render different input fields, where user can type different values.
// Once user has typed values on every field, then user is able to add new user to
// the database via pressing "Register" button, which will execute "onSubmit" function
// at => "RegistrationScreen" component. If user chooses to "cancel" account creation
// process, then user can press "Cancel" button, which will redirect user back to
// the login screen (LoginScreen component).
const RegistrationForm = ({ history, onSubmit }) => {

  // Define "cancelRegistration" function, which will redirect user to
  // the login screen, when function is being referenced.
  const cancelRegistration = () => {
    history.push("/")
  };

  // Component will render everything inside of (...) back to the user.
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

// Define "RegistrationScreen" component, which will execute everything inside of {...},
// component will allow the user create new account to the account via hook (userRegistration)
// and "onSubmit" button, which get "values" from input fields at "RegistrationForm" where
// user types different values on different input fields. If account creation failed, "Alert"
// component will be rendered back and reason "error.message" why account creation failed.
const RegistrationScreen = () => {

  const [userRegistration] = useCreateNewUser(); // Define "userRegistration" variable from => "useCreateNewUser(...)" hook.
  const history = useHistory(); // Define "history" variable, which will execute => "useHistory(...)" function.

  // Define "onSubmit" function, which will execute everything inside of {...}, so
  // basically every time user wants to add new account to the database via pressing
  // button, this function will be referenced, which means we will execute function
  // "userRegistration" and give parameter values, which we get from "values" aka
  // input fields (where user just gave values at). If new account creation is
  // successful, then user will be redirected back to login screen.
  const onSubmit = async (values) => {

    const { name, username, password, email } = values; // Define {...} variables, which are equal to "values" variable.

    // First we will do "try" section, if something fails during that, we will execute "catch" section.
    try {
      // Define "data" variable from "userRegistration(...)" hook and execute that function
      // with parameter values, which comes from input fields ("values" variable).
      const { data } = await userRegistration({ name, username, password, email });
      history.push("/"); // Redirect user to "/" path aka login screen.
    } catch (error) { // If there is a problem at "try" section, then "Alert" component will be rendered.
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

  // Component will render everything inside of (...) back to the user.
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

// Export "RegistrationScreen" component, so other components like "App.js" are able to use this hooks's content.
export default RegistrationScreen;
