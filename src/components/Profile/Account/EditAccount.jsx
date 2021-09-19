// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react'; // Import "react" library's content for this component usage.
import { useHistory } from 'react-router-native'; // Import following functions from "react-router-native" library's content for this component usage.
import { ActivityIndicator, View, StyleSheet, Text, Pressable } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Appbar, TextInput, Card, Button } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.
import { FontAwesome5 } from '@expo/vector-icons'; // Import following components from "@expo/vector-icons" libary for this component usage.

import SelectedOption from './SelectedOption'; // Import "SelectedOption" component from "SelectedOption.jsx" file for this component usage.
import styling from '../../../styling'; // Import "styling" variable from "styling.js" for this component usage.

// Define "loadingContainer" variable, which will be used to create style
// if data is "loading" we will return => "loading spinner".
const loadingContainer = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styling.colors.VistaWhite,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const editAccountHeaderContainer = StyleSheet.create({
  appBarContainer: {
    backgroundColor: styling.colors.Asphalt,
    height: 50,
  },
  appBarContent: {
    color: styling.colors.VistaWhite
  }
});

const EditAccount = ({ currentUserData, loading }) => {

  const [nameValue, setNameValue] = useState({
    status: false,
    data: '',
  });

  const [emailValue, setEmailValue] = useState({
    status: false,
    data: '',
  });

  const history = useHistory(); // Define "history" variable, which will execute => "useHistory(...)" function.

  // Define "goBackPreviousRoute" variable, which will execute everything inside
  // of {...}. When app will render this component, user can choose to go back
  // previous route where user was. If for example user came from "Home", then
  // this function will redirect user to => "/dashboard" path when referenced.
  const goBackPreviousRoute = () => {
    history.goBack();
  };

  const resetAccountValues = () => {
    setNameValue({ status: false, data: '' });
    setEmailValue({ status: false, data: '' });
  };

  // If "me" querys data => "currentUserData" is still loading from the dabase, component
  // will render everything inside of (...) (loading spinner) untill data has loaded.
  if (loading) {
    return (
      <View style={loadingContainer.container}>
        <ActivityIndicator size="large" color={styling.colors.Asphalt} />
      </View>
    );
  };

  // Component will render everything inside of (...) back to the user.
  return (
    <View>
      <Appbar.Header statusBarHeight={0} style={editAccountHeaderContainer.appBarContainer}>
        <Appbar.BackAction onPress={goBackPreviousRoute} />
        <Appbar.Content titleStyle={editAccountHeaderContainer.appBarContent} title="Edit Account" titleStyle={{ fontFamily: 'PermanentMarker_400Regular' }} />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>

      <View>


        <Card style={{ marginTop: 10, marginBottom: 10, backgroundColor: styling.colors.Asphalt, width: '40%', alignSelf: 'center', elevation: 10 }}>
          <Text style={{ padding: 5, textAlign: 'center', color: styling.colors.VistaWhite }}>ACCOUNT</Text>
        </Card>



        <View style={{ margin: 5, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 0.80 }}>
            <TextInput
              disabled={nameValue.status === false ? true : false}
              mode="flatline"
              label="Edit personal name."
              placeholder={currentUserData.name}
              value={nameValue.data}
              onChangeText={(result) => setNameValue({ data: result })}
              right={<TextInput.Affix text="/100" />}
              style={{ backgroundColor: styling.colors.VistaWhite, borderWidth: 1 }}
              theme={{colors: {primary: styling.colors.Asphalt}}}
              selectionColor={styling.colors.Asphalt}
            />
          </View>
          <SelectedOption accountValue={nameValue} setAccountValue={setNameValue} />
        </View>

        <View style={{ margin: 5, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 0.80 }}>
            <TextInput
              disabled={emailValue.status === false ? true : false}
              mode="flatline"
              label="Edit personal email."
              placeholder={currentUserData.email}
              value={emailValue.data}
              onChangeText={(result) => setEmailValue({ data: result })}
              right={<TextInput.Affix text="/100" />}
              style={{ backgroundColor: styling.colors.VistaWhite, borderWidth: 1 }}
              theme={{colors: {primary: styling.colors.Asphalt}}}
              selectionColor={styling.colors.Asphalt}
            />
          </View>
          <SelectedOption accountValue={emailValue} setAccountValue={setEmailValue} />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, marginBottom: 10 }}>
          <Button style={{ flex: 1/3 }} color={styling.colors.Asphalt} mode="contained" onPress={() => console.log('test')}>
            <Text style={{ fontFamily: 'PermanentMarker_400Regular' }}>Confirm</Text>
          </Button>
          <Button style={{ flex: 1/3 }} color={styling.colors.Asphalt} mode="contained" onPress={resetAccountValues}>
            <Text style={{ fontFamily: 'PermanentMarker_400Regular' }}>Cancel</Text>
          </Button>
        </View>




      </View>
    </View>
  );
};

// Export "EditAccount" component, so other components like "App.js" are able to use this hooks's content.
export default EditAccount;
