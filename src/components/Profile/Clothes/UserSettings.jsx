// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { useHistory } from 'react-router-native'; // Import following functions from "react-router-native" library's content for this component usage.
import { Alert, ActivityIndicator, Image, ScrollView, View, StyleSheet, Text } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Avatar, Appbar, Card, IconButton, Title, Paragraph } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.
import TextAvatar from 'react-native-text-avatar'; // Import following components from 'react-native-text-avatar' library for this component usage.

import UserRating from '../../UserRating'; // Import "UserRating" component from "UserRating.jsx" file for this component usage.

import { useApolloClient } from '@apollo/client'; // Import following functions from "@apollo/client" libary for this component usage.

import useDeleteUser from '../../../hooks/useDeleteUser'; // Import "useDeleteUser" hook from "useDeleteUser.js" file for this component usage.
import useAuthStorage from '../../../hooks/useAuthStorage'; // Import "useAuthStorage" hook from "useAuthStorage.js" file for this component usage.

import styling from '../../../styling'; // Import "styling" variable from "styling.js" for this component usage.

// Define "loadingContainer" variable, which will be used to create style
// if data is "loading" we will return => "loading spinner".
const loadingContainer = StyleSheet.create({
  container: {
    backgroundColor: styling.colors.VistaWhite,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

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
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    marginBottom: 10
  },
  headerTitleContainer: {
    fontFamily: styling.fonts.buttonContent,
    fontSize: 19,
  },
  avatarContainer: {
    position: 'absolute',
    right: 0,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5,
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
    backgroundColor: styling.colors.Asphalt,
    padding: 5,
    marginBottom: 5,
    elevation: 5,
    color: styling.colors.VistaWhite,
    fontFamily: styling.fonts.buttonContent,
    fontSize: 12
  },
});

const cardTitleContainer = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 3,
    backgroundColor: styling.colors.VistaWhite,
    width: '90%',
    alignSelf: 'center',
    elevation: 3
  },
});

// Define "buttonContainer" variable, which will be used to create style
// for buttons, if for example user wants to delete his account from db.
const buttonContainer = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
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

const CurrentUserAvatar = ({ checkUserAvatar, currentUserName }) => {

  if (checkUserAvatar) {
    return (
      <Image style={{ width: 50, height: 50, borderRadius: 50 / 2 }} source={{ uri: checkUserAvatar }} />
    )
  } else {
    return (
      <TextAvatar backgroundColor={styling.colors.Asphalt} textColor={styling.colors.VistaWhite} size={50} type={'circle'}>
        {currentUserName}
      </TextAvatar>
    );
  };
};


// Define "UserSettings" component, which will execute everything inside of {...}
// and render back either "loading spinner" or current logged user data.
const UserSettings = ({ setCurrentToken, currentUserData, loading }) => {

  const client = useApolloClient(); // Define "client" variable, which is equal to "useApolloClient(...)" function.
  const authStorage = useAuthStorage(); // Define "authStorage" variable, which is equal to "useAuthStorage(...)" function.

  const logoutUserToken = async () => {
    try {
      await authStorage.removeAccessToken();
      client.clearStore();
      setCurrentToken(null);
    } catch (error) {
      console.log(error.message);
    };
  };

  const confirmUserLogout = () => {
    Alert.alert(
      "Biostack",
      "Are you sure you want to logout from the app?",
      [
        {
          text: "CANCEL",
          onPress: () => console.log('User has cancelled logout process!'),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => logoutUserToken(),
        }
      ]
    )
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

  const history = useHistory(); // Define "history" variable, which will execute => "useHistory(...)" function.

  // Component will render everything inside of (...) back to the user.
  return (
    <ScrollView>
      <Appbar.Header statusBarHeight={0} style={settingsHeaderContainer.appBarContainer}>
        <Appbar.Content titleStyle={settingsHeaderContainer.appBarContent} title="Your profile information" titleStyle={{ fontFamily: 'PermanentMarker_400Regular' }} />
        <Appbar.Action icon="logout" onPress={confirmUserLogout} />
      </Appbar.Header>
      <Card style={profileOverviewContainer.mainContainer}>
        <Card.Content>
          <View style={profileOverviewContainer.headerContainer}>
            <Title style={profileOverviewContainer.headerTitleContainer}>Your account</Title>
            <View style={profileOverviewContainer.avatarContainer}>
              <CurrentUserAvatar checkUserAvatar={currentUserData.facebookAvatar} currentUserName={currentUserData.name} />
            </View>
          </View>
          <View style={profileOverviewContainer.contentContainer}>
            <View style={profileOverviewContainer.contentPrimary}>
              <Text style={profileOverviewContainer.contentButton}>USERNAME</Text>
              <Text>{currentUserData.username}</Text>
            </View>
            <View style={profileOverviewContainer.contentSecondary}>
              <Text style={profileOverviewContainer.contentButton}>NAME</Text>
              <Text>{currentUserData.name}</Text>
            </View>
          </View>
          <View style={profileOverviewContainer.contentContainer}>
            <View style={profileOverviewContainer.contentPrimary}>
              <Text style={profileOverviewContainer.contentButton}>RATING</Text>
              <UserRating currentRating={currentUserData.rating} />
            </View>
            <View style={profileOverviewContainer.contentSecondary}>
              <Text style={profileOverviewContainer.contentButton}>EMAIL</Text>
              <Text>{currentUserData.email}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
      <Card.Title
        style={cardTitleContainer.container}
        title="Clothes"
        titleStyle={{fontFamily: styling.fonts.buttonContent, fontSize: 20 }}
        subtitle="Your listed clothes on the app."
        subtitleStyle={{fontFamily: styling.fonts.buttonContent }}
        left={(props) => <Avatar.Icon {...props} style={{ backgroundColor: styling.colors.Asphalt }} icon="hanger" />}
        right={(props) => <IconButton {...props} icon="chevron-right" onPress={() => history.push('/dashboard/profile/clothes')} />}
      />
      <Card.Title
        style={cardTitleContainer.container}
        title="Bookmarks"
        titleStyle={{fontFamily: styling.fonts.buttonContent, fontSize: 20 }}
        subtitle="Bookmarked clothes on the app."
        subtitleStyle={{fontFamily: styling.fonts.buttonContent }}
        left={(props) => <Avatar.Icon {...props} style={{ backgroundColor: styling.colors.Asphalt }} icon="bookmark-multiple-outline" />}
        right={(props) => <IconButton {...props} icon="chevron-right" />}
      />
      <Card.Title
        style={cardTitleContainer.container}
        title="Transactions"
        titleStyle={{fontFamily: styling.fonts.buttonContent, fontSize: 20 }}
        subtitle="Your orders history on the app."
        subtitleStyle={{fontFamily: styling.fonts.buttonContent }}
        left={(props) => <Avatar.Icon {...props} style={{ backgroundColor: styling.colors.Asphalt }} icon="basket-outline" />}
        right={(props) => <IconButton {...props} icon="chevron-right" onPress={() => history.push('/dashboard/profile/transactions')} />}
      />
      <Card.Title
        style={cardTitleContainer.container}
        title="Edit Account"
        titleStyle={{fontFamily: styling.fonts.buttonContent, fontSize: 20 }}
        subtitle="Edit your account information."
        subtitleStyle={{fontFamily: styling.fonts.buttonContent }}
        left={(props) => <Avatar.Icon {...props} style={{ backgroundColor: styling.colors.Asphalt }} icon="account-edit-outline" />}
        right={(props) => <IconButton {...props} icon="chevron-right" onPress={() => history.push('/dashboard/profile/edit-account')} />}
      />
    </ScrollView>
  );
};

// Export "UserSettings" component, so other components like "App.js" are able to use this hooks's content.
export default UserSettings;
