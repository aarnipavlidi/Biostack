// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { Alert, ScrollView, View, Pressable, Text, StyleSheet } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Button, Divider } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.
import { useHistory } from 'react-router-native'; // Import following functions from "react-router-native" library's content for this component usage.

import useAuthStorage from '../hooks/useAuthStorage'; // Import "useAuthStorage" hook from "useAuthStorage.js" file for this component usage.
import * as Facebook from 'expo-facebook';
import Constants from 'expo-constants'; // Import "Constants" component from "expo-constants" for this component usage.

import styling from '../styling'; // Import "styling" variable from "styling.js" for this component usage.
import FormikTextInput from './FormikTextInput'; // Import "FormikTextInput" component from "FormikTextInput.jsx" for this component usage.

import { Formik } from 'formik'; // Import "Formik" component from "formik" libary's content for this component usage.
import * as yup from 'yup'; // Import everything as "yup" from "yup" libary's content for this component usage.

import useLogin from '../hooks/useLogin'; // Import "useLogin" hook from "useLogin.js" file for this component usage.
import useLoginFacebook from '../hooks/useLoginFacebook'; // Import "useLoginFacebook" hook from "useLoginFacebook.js" file for this component usage.

const container = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: styling.colors.VistaWhite,
  },
});

const titleContainer = StyleSheet.create({
  container: {
    marginBottom: 15,
    alignItems: 'center',
  },
  containerTitle: {
    textAlign: 'center',
    color: styling.colors.Asphalt,
    fontFamily: styling.fonts.loginScreenTitle,
    fontSize: styling.fontSizes.title,
  },
  containerText: {
    textAlign: 'center',
    width: '90%',
    color: styling.colors.Asphalt,
    fontFamily: styling.fonts.loginScreenSubtitle,
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
    backgroundColor: styling.colors.Asphalt,
  },
  buttonContentText: {
    fontFamily: styling.fonts.buttonContent,
    color: styling.colors.VistaWhite
  },
});

const facebookContainer = StyleSheet.create({
  divider: {
    flexDirection: 'row',
    flexGrow: 1,
    marginTop: 25
  },
  dividerItem: {
    height: 2,
    backgroundColor: styling.colors.Asphalt,
    flex: 1/2,
    marginLeft: 15,
    marginRight: 15,
    alignSelf: 'center',
  },
  dividerText: {
    textAlign: 'center',
    fontFamily: styling.fonts.loginScreenSubtitle,
    fontSize: 19,
  },
  button: {
    backgroundColor: styling.colors.Asphalt,
    marginTop: 25,
    marginLeft: 25,
    marginRight: 25
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

// Define "LoginForm" component, which will execute everything inside of {...}. Component
// will render "username" and "password" input fields, so user has possibility to log in
// to the app. If user does not have currently registered account, then user can create
// one with via "Sign Up" button, which then user will be pushed to the "/register" path
// and app will render "RegistrationScreen" component back to the user.
const LoginForm = ({ history, onSubmit, loading }) => {

  // Define "goRegistration" variable, which will push the user to the
  // "/register" path everytime function is being referenced.
  const goRegistration = () => {
    history.push("/register")
  };

  // Component will render everything inside of (...) back to the user.
  return (
    <View>
      <FormikTextInput name="username" placeholder="Please enter your username." />
      <FormikTextInput name="password" placeholder="Please enter your password." secureTextEntry={true} />
      <View style={buttonContainer.container}>
        <Button style={buttonContainer.buttonContent} mode="contained" onPress={onSubmit} loading={loading}>
          <Text style={buttonContainer.buttonContentText}>Sign In</Text>
        </Button>
        <Button style={buttonContainer.buttonContent} mode="contained" onPress={goRegistration}>
          <Text style={buttonContainer.buttonContentText}>Sign Up</Text>
        </Button>
      </View>
    </View>
  );
};

// Define "LoginScreen" component, which will execute everything inside of {...}. Component
// handles the all the logic behind, so the user is able to login to the app with given
// credentials information. Component is using "useLogin" hook, so we are able to use
// "userLogin" function, which will execute the mutation. If user credentials are right,
// then user will be redirected back to the homepage => "/dashboard", which lets user
// then use the whole app. We are also storing logged user's token value into "authStorage",
// which then we able to change "currentToken" variable state by using "setCurrentToken(...)"
// function. Purpose of this is that, app will render specific component based on that if
// user is logged or not to the app.
const LoginScreen = ({ setCurrentToken }) => {

  const [userLogin, { userLoading }] = useLogin(); // Define "userLogin" variable from => "useLogin(...)" hook.
  const [userLoginFacebook, { facebookLoading }] = useLoginFacebook(); // Define "userLoginFacebook" variable from => "useLoginFacebook(...)" hook.
  const history = useHistory(); // Define "history" variable, which will execute => "useHistory(...)" function.

  const authStorage = useAuthStorage(); // Define "authStorage" variable, which is equal to "useAuthStorage(...)" function.

  // Define "onSubmit" variable, which will execute everything inside of {...} every time
  // it's being referenced. So whenever user is trying to login to the app, this function
  // will be executed and we are checking if user's given input field values match with
  // backend data via "userLogin" function (mutation). If there is a matching data on the
  // backend, then user will be redirected to the homepage. If there is no matching data,
  // then user will be alerted the reason behind it via "Alert" component.
  const onSubmit = async (values, { resetForm }) => {

    const { username, password } = values; // Define "username" and "password" variables to be equal => "values".

    // Function "onSubmit" will try execute first "try" section, if there is
    // going to be problem during this, then we will go into "catch" section
    // and execute everything inside of {...}.
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

  const facebookLogin = async () => {

    try {
      await Facebook.initializeAsync({
        appId: Constants.manifest.facebookAppId,
      });

      const { type, token, expirationDate, permissions, declinedPermissions } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile, email, user_location'],
      });

      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture.width(240).height(240),location{location{city,region_id,latitude,longitude}}&access_token=${token}`);
        const getResponse = await response.json();

        const createUsername = getResponse.name.replace(/\s/g, "").toLowerCase();
        const { data } = await userLoginFacebook(
          getResponse.id,
          getResponse.picture.data.url,
          getResponse.email,
          getResponse.name,
          createUsername,
          getResponse.location.location.city,
          getResponse.location.location.region_id,
          getResponse.location.location.latitude,
          getResponse.location.location.longitude,
        );

        const tokenResponse = await authStorage.getAccessToken();
        setCurrentToken(tokenResponse);
        history.push("/dashboard");
      } else {
            // type === 'cancel'
          }
        } catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
        }
      };

  // Component will render everything inside of (...) back to the user.
  return (
    <View style={container.container}>
      <View style={titleContainer.container}>
        <Text style={titleContainer.containerTitle}>Biostack</Text>
        <Text style={titleContainer.containerText}>Place where you can sell or buy second hand clothes with other people.</Text>
      </View>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={loginFormValidationSchema}>
        {({ handleSubmit }) => <LoginForm history={history} onSubmit={handleSubmit} loading={userLoading} />}
      </Formik>
      <View>
        <View style={facebookContainer.divider}>
          <Text style={facebookContainer.dividerItem}> </Text>
          <Text style={facebookContainer.dividerText}>OR</Text>
          <Text style={facebookContainer.dividerItem}> </Text>
        </View>

        <Button style={facebookContainer.button} icon="facebook" mode="contained" onPress={facebookLogin} loading={facebookLoading}>
          <Text style={buttonContainer.buttonContentText}>Continue with Facebook</Text>
        </Button>
      </View>
    </View>
  );
};

// Export "LoginScreen" component, so other components like "App.js" are able to use this hooks's content.
export default LoginScreen;
