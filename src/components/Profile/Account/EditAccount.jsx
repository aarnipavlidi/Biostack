// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react'; // Import "react" library's content for this component usage.
import { useHistory } from 'react-router-native'; // Import following functions from "react-router-native" library's content for this component usage.
import { View, StyleSheet, Text } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Appbar, TextInput, Card } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.
import { FontAwesome5 } from '@expo/vector-icons'; // Import following components from "@expo/vector-icons" libary for this component usage.

import styling from '../../../styling'; // Import "styling" variable from "styling.js" for this component usage.

const editAccountHeaderContainer = StyleSheet.create({
  appBarContainer: {
    backgroundColor: styling.colors.Asphalt,
    height: 50,
  },
  appBarContent: {
    color: styling.colors.VistaWhite
  }
});

const EditAccount = () => {

  const [text, setText] = useState('Aarni');

  const history = useHistory(); // Define "history" variable, which will execute => "useHistory(...)" function.

  // Define "goBackPreviousRoute" variable, which will execute everything inside
  // of {...}. When app will render this component, user can choose to go back
  // previous route where user was. If for example user came from "Home", then
  // this function will redirect user to => "/dashboard" path when referenced.
  const goBackPreviousRoute = () => {
    history.goBack();
  };

  // Component will render everything inside of (...) back to the user.
  return (
    <View>
      <Appbar.Header statusBarHeight={0} style={editAccountHeaderContainer.appBarContainer}>
        <Appbar.BackAction onPress={goBackPreviousRoute} />
        <Appbar.Content titleStyle={editAccountHeaderContainer.appBarContent} title="Edit Account" titleStyle={{ fontFamily: 'PermanentMarker_400Regular' }} />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>

      <Card style={{ marginTop: 10, marginBottom: 10, backgroundColor: styling.colors.Asphalt, width: '50%', alignSelf: 'center', elevation: 10 }}>
        <Text style={{ padding: 5, textAlign: 'center', color: styling.colors.VistaWhite }}>Your name</Text>
      </Card>

      <View style={{ margin: 5, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 0.80 }}>
          <TextInput
            disabled={true}
            mode="flatline"
            label={text}
            placeholder="Type something"
            right={<TextInput.Affix text="/100" />}
          />
        </View>
        <View style={{ flex: 0.20, alignItems: 'center' }}>
          <FontAwesome5 style={{ width: 50, padding: 10, textAlign: 'center' }} name="edit" size={24} color={styling.colors.Asphalt} />
        </View>
      </View>


    </View>
  );
};

// Export "EditAccount" component, so other components like "App.js" are able to use this hooks's content.
export default EditAccount;
