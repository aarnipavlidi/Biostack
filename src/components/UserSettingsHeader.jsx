// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { Image, View, StyleSheet, Pressable, Text } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Appbar, Card, Title, Paragraph } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.

import { Ionicons } from '@expo/vector-icons'; // Import following components from "@expo/vector-icons" libary for this component usage.

import { useHistory } from 'react-router-native'; // Import following functions from "react-router-native" library's content for this component usage.

import styling from '../styling'; // Import "styling" variable from "styling.js" for this component usage.

const settingsHeaderContainer = StyleSheet.create({
  appBarContainer: {
    backgroundColor: styling.colors.Asphalt,
    height: 50,
  },
  appBarContent: {
    color: styling.colors.VistaWhite
  }
});

const profileOverviewContainer = StyleSheet.create({
  mainContainer: {
    elevation: 5,
    width: '90%',
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: styling.colors.VistaWhite
  },
  headerContainer: {
    flexDirection: 'row',
    height: 50,
  },
  avatarContainer: {
    position: 'absolute',
    right: 0,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5
  },
  contentPrimary: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  contentSecondary: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  contentButton: {
    height: 25,
    borderWidth: 10,
    borderRadius: 25 / 2,
    backgroundColor: styling.colors.Asphalt,
    textAlign: 'center',
    color: styling.colors.VistaWhite
  },
});

const userSettingsContainer = StyleSheet.create({
  mainContainer: {
    backgroundColor: styling.colors.VistaWhite,
  },
  titleContainer: {
    justifyContent: 'center',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10
  },
  titleText: {
    textAlign: 'center',
    color: styling.colors.Asphalt,
    borderBottomWidth: 2,
    borderBottomColor: styling.colors.Asphalt
  },
});

// Define "buttonContainer" variable, which will be used to create style
// for buttons, if for example user wants to delete his account from db.
const buttonContainer = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    marginTop: 15,
    width: '75%',
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

const UserRating = ({ currentRating }) => {

  const formatRating = parseInt(currentRating);

  if (formatRating < 1) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Ionicons name="heart-outline" size={22} color={styling.colors.Asphalt} />
        <Ionicons name="heart-outline" size={22} color={styling.colors.Asphalt} />
        <Ionicons name="heart-outline" size={22} color={styling.colors.Asphalt} />
      </View>
    );
  };

  if (formatRating >= 1 && formatRating < 2) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Ionicons name="heart-sharp" size={22} color={styling.colors.Asphalt} />
        <Ionicons name="heart-outline" size={22} color={styling.colors.Asphalt} />
        <Ionicons name="heart-outline" size={22} color={styling.colors.Asphalt} />
      </View>
    );
  };

  if (formatRating >= 2 && formatRating < 3) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Ionicons name="heart-sharp" size={22} color={styling.colors.Asphalt} />
        <Ionicons name="heart-sharp" size={22} color={styling.colors.Asphalt} />
        <Ionicons name="heart-outline" size={22} color={styling.colors.Asphalt} />
      </View>
    );
  };

  if (formatRating >= 3) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Ionicons name="heart-sharp" size={22} color={styling.colors.Asphalt} />
        <Ionicons name="heart-sharp" size={22} color={styling.colors.Asphalt} />
        <Ionicons name="heart-sharp" size={22} color={styling.colors.Asphalt} />
      </View>
    );
  };
};

const UserSettingsHeader = ({ currentUserData, confirmUserDelete }) => {

  const history = useHistory(); // Define "history" variable, which will execute => "useHistory(...)" function.

  // Define "goBackPreviousRoute" variable, which will execute everything inside
  // of {...}. When app will render this component, user can choose to go back
  // previous route where user was. If for example user came from "Home", then
  // this function will redirect user to => "/dashboard" path when referenced.
  const goBackPreviousRoute = () => {
    history.goBack();
  };

  const handleMore = () => console.log("Show more settings from this component!");

  // Component will render everything inside of (...) back to the user.
  return (
    <View>
      <Appbar.Header statusBarHeight={0} style={settingsHeaderContainer.appBarContainer}>
        <Appbar.BackAction onPress={goBackPreviousRoute} />
        <Appbar.Content titleStyle={settingsHeaderContainer.appBarContent} title="Your profile information" />
        <Appbar.Action icon="dots-vertical" onPress={handleMore} />
      </Appbar.Header>

      <Card style={profileOverviewContainer.mainContainer}>
        <Card.Content>
          <View style={profileOverviewContainer.headerContainer}>
            <Title>Profile Overview</Title>
            <View style={profileOverviewContainer.avatarContainer}>
              <Image style={{ width: 50, height: 50, borderRadius: 50 / 2 }} source={{ uri: 'https://picsum.photos/50/50?grayscale'}} />
            </View>
          </View>

          <View style={profileOverviewContainer.contentContainer}>

            <View style={profileOverviewContainer.contentPrimary}>
              <Text style={profileOverviewContainer.contentButton}>Username</Text>
              <Text>{currentUserData.username}</Text>
            </View>
            <View style={profileOverviewContainer.contentSecondary}>
              <Text style={profileOverviewContainer.contentButton}>Name</Text>
              <Text>{currentUserData.name}</Text>
            </View>
          </View>

          <View style={profileOverviewContainer.contentContainer}>

            <View style={profileOverviewContainer.contentPrimary}>
              <Text style={profileOverviewContainer.contentButton}>Rating</Text>
              <UserRating currentRating={currentUserData.rating} />
            </View>

            <View style={profileOverviewContainer.contentSecondary}>
              <Text style={profileOverviewContainer.contentButton}>Email</Text>
              <Text>{currentUserData.email}</Text>
            </View>

          </View>
        </Card.Content>
      </Card>


      <View style={buttonContainer.container}>
        <Pressable style={buttonContainer.buttonContent} onPress={confirmUserDelete}>
          <Text style={buttonContainer.buttonContentText}>Delete your account.</Text>
        </Pressable>
      </View>
      <View style={userSettingsContainer.titleContainer}>
        <Title style={userSettingsContainer.titleText}>Your current listed items on the app</Title>
      </View>
    </View>
  );
};

// Export "UserSettingsHeader" component, so other components like "App.js" are able to use this hooks's content.
export default UserSettingsHeader;
