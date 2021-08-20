// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { View, StyleSheet, Text } from 'react-native'; // Import following components from "react-native" library for this component usage.


const UserListedProducts = ({ item }) => {

  return (
    <View>
      <Text>{item._id}</Text>
      <Text>{item.productTitle}</Text>
      <Text>{item.productDescription}</Text>
      <Text>{item.productPrice} €</Text>
      <Text>{item.productGroupName}</Text>
    </View>
  )

};

export default UserListedProducts;
