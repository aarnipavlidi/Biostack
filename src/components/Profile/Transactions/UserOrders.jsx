// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { View, Text } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { DataTable } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.

import styling from '../../../styling'; // Import "styling" variable from "styling.js" for this component usage.

const UserOrders = ({ item }) => {

  return (
    <DataTable.Row>
      <DataTable.Cell>{item.productTitle}</DataTable.Cell>
      <DataTable.Cell>{item.type}</DataTable.Cell>
      <DataTable.Cell>{item.paymentTotal}</DataTable.Cell>
    </DataTable.Row>
  );
};

// Export "UserOrders" component, so other components like "App.js" are able to use this hooks's content.
export default UserOrders;
