// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage component to use its library content this component.

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  // When user has logged in to the app, we will be able to get current user
  // token value via using "getAccessToken(...)" function.
  async getAccessToken() {
    const currentUserToken = await AsyncStorage.getItem(`${this.namespace}`);

    return currentUserToken ? JSON.parse(currentUserToken) : null;
  }

  // If we want to change current token value to something different, we can
  // use following "setAccessToken(...)" function to change it.
  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(`${this.namespace}`, JSON.stringify(accessToken));
  }

  // When user wants to logout or delete account, app will remove it's current
  // logged user token value from storage => "removeAccessToken(...)" function.
  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}`);
  }
}

// Export "AuthStorage" component, so other components like "App.js" are able to use this component's content.
export default AuthStorage;
