// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const currentUserToken = await AsyncStorage.getItem(`${this.namespace}`);

    return currentUserToken ? JSON.parse(currentUserToken) : null;
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(`${this.namespace}`, JSON.stringify(accessToken));
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}`);
  }
}

export default AuthStorage;
