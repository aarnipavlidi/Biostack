// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { Image, Text, View, StyleSheet } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Card, Title, Paragraph } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.

import styling from '../styling'; // Alustetaan "styling" niminen muuttuja, jonka avulla sovellus ottaa erillisen tyylitiedoston (styling.js) käyttöönsä.

const ProductRenderAll = () => {

  return (
    <Card style={{ flex: 1, marginLeft: 5, marginRight: 5, elevation: 3 }}>
      <Card.Content>
        <Card.Cover source={require('../../assets/images/clothes/Vanilla_Front_900x.jpg')} />
      </Card.Content>
    </Card>
  );
};

// Export "ProductRenderAll" component, so other components like "App.js" are able to use this hooks's content.
export default ProductRenderAll;
