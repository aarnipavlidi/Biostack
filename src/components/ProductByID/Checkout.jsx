// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react'; // Import "react" library's content for this component usage.
import { ImageBackground, View, Text, StyleSheet } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Modal, Portal, Title, Caption, Divider, RadioButton } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.

import { Fontisto, Feather } from '@expo/vector-icons'; // Import following components from "@expo/vector-icons" libary for this component usage.
import ItemSizeCheck from '../ItemSizeCheck'; // Import "ItemSizeCheck" component from "ItemSizeCheck.jsx" file for this component usage.
import ItemTypeCheck from '../ItemTypeCheck'; // Import "ItemTypeCheck" component from "ItemTypeCheck.jsx" file for this component usage.

import styling from '../../styling'; // Import "styling" variable from "styling.js" for this component usage.

const modal = StyleSheet.create({
  mainContainer: {
    backgroundColor: styling.colors.VistaWhite,
    marginTop: 100,
    marginLeft: 10,
    marginRight: 10,
  },
  headerContent: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headerTitle: {
    backgroundColor: styling.colors.VistaWhite,
    marginTop: 25,
    marginLeft: 15,
    borderColor: styling.colors.VistaWhite,
    borderRadius: 25 / 2,
    // elevation problem need to fix.
  },
  title: {
    padding: 5,
    color: styling.colors.Asphalt
  },
  headerIcon: {
    justifyContent: 'center',
    backgroundColor: styling.colors.VistaWhite,
    marginTop: 25,
    marginRight: 15,
    borderWidth: 5,
    borderColor: styling.colors.VistaWhite,
    borderRadius: 50 / 2,
    // elevation problem need to fix.
  },
  summaryContainer: {
    marginBottom: 10
  },
  summaryContent: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  summaryTitle: {
    marginTop: 5,
    marginLeft: 15,
    padding: 3,
    backgroundColor: styling.colors.Asphalt,
    color: styling.colors.VistaWhite,
  },
  summaryValue: {
    marginTop: 5,
    marginRight: 15,
    padding: 3,
    color: styling.colors.Asphalt,
  },
  shippingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  shippingTitle: {
    flexDirection: 'row',
  },
});

const Checkout = ({ getCurrentProduct, currentUserData, visible, hideModal }) => {

  const [checked, setChecked] = useState('first');
  console.log(checked);


  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={modal.mainContainer}>

      <View>
        <ImageBackground style={{ height: 100, width: '100%' }} resizeMode="cover" source={require('../../../assets/images/clothes/andrej-lisakov-Yy4sN6QzboU-unsplash.jpg')}>
        <View style={modal.headerContent}>
          <View style={modal.headerTitle}>
            <Title style={modal.title}>Order Summary</Title>
          </View>
          <View style={modal.headerIcon}>
            <Fontisto style={{ padding: 5 }} name="shopping-basket" size={24} color={styling.colors.Asphalt} />
          </View>
        </View>
        </ImageBackground>
      </View>

      <View style={modal.summaryContainer}>
        <View style={modal.summaryContent}>
          <Text style={modal.summaryTitle}>NAME</Text>
          <Text style={modal.summaryValue}>{getCurrentProduct.productTitle}</Text>
        </View>
        <Divider />
        <View style={modal.summaryContent}>
          <Text style={modal.summaryTitle}>SIZE</Text>
          <View style={modal.summaryValue} >
            <ItemSizeCheck currentItemSize={getCurrentProduct.productSize} />
          </View>
        </View>
        <Divider />
        <View style={modal.summaryContent}>
          <Text style={modal.summaryTitle}>TYPE</Text>
          <View style={modal.summaryValue}>
            <ItemTypeCheck currentItemType={getCurrentProduct.productGroupName} />
          </View>
        </View>
        <Divider />
        <View style={modal.summaryContent}>
          <Text style={modal.summaryTitle}>PRICE</Text>
          <Text style={modal.summaryValue}>{getCurrentProduct.productPrice} €</Text>
        </View>
        <Divider />
      </View>

      <View>

      <View style={modal.shippingContainer}>

        <View style={modal.shippingTitle}>
          <Title>Shipping</Title>
          <Feather name="package" size={24} color="black" />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

          <View style={{ flexShrink: 1 }}>
            <Text>Pickup</Text>
            <Caption>Captiosdasdsdsdsadsaadasdasdsadasdsadsadsadasdn</Caption>
          </View>

          <View style={{ flexShrink: 1 }}>
            <RadioButton
              value="first"
              status={ checked === 'first' ? 'checked' : 'unchecked' }
              onPress={() => setChecked('first')}
            />
          </View>

          </View>

        </View>




      </View>



      </Modal>
    </Portal>
  );
};

// Export "Checkout" component, so other components like "App.js" are able to use this hooks's content.
export default Checkout;
