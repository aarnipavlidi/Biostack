// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { Pressable, Image, Text, View, StyleSheet } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Card } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.

import styling from '../../styling'; // Import "styling" variable from "styling.js" for this component usage.

const ProductImage = ({ getImageName, getImageValue }) => {

  if (getImageName === 'sweater' && getImageValue === 1) {
    return (
      <Card.Cover style={{ width: 330, height: 332, alignSelf: 'center', marginTop: 5, backgroundColor: styling.colors.VistaWhite }} source={require('../../../assets/images/clothes/Blue_Front_900x.png')} />
    );
  };

  if (getImageName === 'sweater' && getImageValue === 2) {
    return (
      <Card.Cover style={{ width: 330, height: 332, alignSelf: 'center', marginTop: 5, backgroundColor: styling.colors.VistaWhite }} source={require('../../../assets/images/clothes/Green_front_900x.png')} />
    );
  };

  if (getImageName === 'sweater' && getImageValue === 3) {
    return (
      <Card.Cover style={{ width: 330, height: 332, alignSelf: 'center', marginTop: 5, backgroundColor: styling.colors.VistaWhite }} source={require('../../../assets/images/clothes/Lemon_Front_900x.png')} />
    );
  };

  if (getImageName === 'sweater' && getImageValue === 4) {
    return (
      <Card.Cover style={{ width: 330, height: 332, alignSelf: 'center', marginTop: 5, backgroundColor: styling.colors.VistaWhite }} source={require('../../../assets/images/clothes/NA_Back_900x.png')} />
    );
  };

  if (getImageName === 'sweater' && getImageValue === 5) {
    return (
      <Card.Cover style={{ width: 330, height: 332, alignSelf: 'center', marginTop: 5, backgroundColor: styling.colors.VistaWhite }} source={require('../../../assets/images/clothes/NA_Front_900x.png')} />
    );
  };

  if (getImageName === 'sweater' && getImageValue === 6) {
    return (
      <Card.Cover style={{ width: 330, height: 332, alignSelf: 'center', marginTop: 5, backgroundColor: styling.colors.VistaWhite }} source={require('../../../assets/images/clothes/Vanilla_Front_900x.png')} />
    )
  };

  if (getImageName === 't-shirt' && getImageValue === 1) {
    return (
      <Card.Cover style={{ width: 330, height: 332, alignSelf: 'center', marginTop: 5, backgroundColor: styling.colors.VistaWhite }} source={require('../../../assets/images/clothes/Black_Classic_Nologo_Front_900x.png')} />
    );
  };

  if (getImageName === 't-shirt' && getImageValue === 2) {
    return (
      <Card.Cover style={{ width: 330, height: 332, alignSelf: 'center', marginTop: 5, backgroundColor: styling.colors.VistaWhite }} source={require('../../../assets/images/clothes/Black_Logo_Front_900x.png')} />
    );
  };

  if (getImageName === 't-shirt' && getImageValue === 3) {
    return (
      <Card.Cover style={{ width: 330, height: 332, alignSelf: 'center', marginTop: 5, backgroundColor: styling.colors.VistaWhite }} source={require('../../../assets/images/clothes/WC_Front_900x.png')} />
    );
  };

  if (getImageName === 't-shirt' && getImageValue === 4) {
    return (
      <Card.Cover style={{ width: 330, height: 332, alignSelf: 'center', marginTop: 5, backgroundColor: styling.colors.VistaWhite }} source={require('../../../assets/images/clothes/WC_LOGO_Front_900x.png')} />
    );
  } else {
    return (
      <Card.Cover style={{ width: 330, height: 332, alignSelf: 'center', marginTop: 5, backgroundColor: styling.colors.VistaWhite }} source={require('../../../assets/images/clothes/Vanilla_Front_900x.png')} />
    );
  };
};

// Export "ProductImage" component, so other components like "App.js" are able to use this hooks's content.
export default ProductImage;
