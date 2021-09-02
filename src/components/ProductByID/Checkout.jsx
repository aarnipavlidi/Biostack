// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react'; // Import "react" library's content for this component usage.
import { ImageBackground, View, Text, StyleSheet } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Modal, Portal, Title, Caption, Divider, RadioButton, Button } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.

import { Fontisto, Feather, MaterialIcons, Entypo } from '@expo/vector-icons'; // Import following components from "@expo/vector-icons" libary for this component usage.
import ItemSizeCheck from '../ItemSizeCheck'; // Import "ItemSizeCheck" component from "ItemSizeCheck.jsx" file for this component usage.
import ItemTypeCheck from '../ItemTypeCheck'; // Import "ItemTypeCheck" component from "ItemTypeCheck.jsx" file for this component usage.

import styling from '../../styling'; // Import "styling" variable from "styling.js" for this component usage.

const modal = StyleSheet.create({
  mainContainer: {
    backgroundColor: styling.colors.VistaWhite,
    marginTop: -120,
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
  },
  shippingTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 20,
  },
  shippingOptionsContainer: {
    flex: 1,
  },
  shippingOptionItem: {
    flexDirection: 'row',
  },
  shippingOptionText: {
    flex: 1,
  },
  shippingOptionButton: {
    justifyContent: 'center',
  },
});

const Checkout = ({ getCurrentProduct, currentUserData, visible, hideModal }) => {

  const [chosenDelivery, setChosenDelivery] = useState({ name: null, price: '0' });
  console.log(chosenDelivery)
  const [chosenPayment, setChosenPayment] = useState({ name: null, price: '0' });
  console.log(chosenPayment)

  const orderTotalPrice = Number(getCurrentProduct.productPrice) + Number(chosenPayment.price) + Number(chosenDelivery.price);

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

      <View style={modal.shippingContainer}>
        <View style={modal.shippingTitle}>
          <Title>Shipping</Title>
          <Feather name="package" size={24} color={styling.colors.Asphalt} />
        </View>
        <View style={modal.shippingOptionsContainer}>
          <View style={modal.shippingOptionItem}>
            <View style={modal.shippingOptionText}>
              <Text>Pickup</Text>
              <Caption>If you want to pickup item from the seller, then choose this option.</Caption>
            </View>
            <View style={modal.shippingOptionButton}>
              <RadioButton
                value="Pickup"
                color={styling.colors.Asphalt}
                status={ chosenDelivery.name === 'Pickup' ? 'checked' : 'unchecked' }
                onPress={() => setChosenDelivery({ name: 'Pickup', price: '0' })}
              />
            </View>
          </View>
          <Divider />
          <View style={modal.shippingOptionItem}>
            <View style={modal.shippingOptionText}>
              <Text>Package delivery</Text>
              <Caption>Seller can also send the item via Posti to the location where you want it.</Caption>
            </View>
            <View style={modal.shippingOptionButton}>
              <RadioButton
                value="Delivery"
                color={styling.colors.Asphalt}
                status={ chosenDelivery.name === 'Delivery' ? 'checked' : 'unchecked' }
                onPress={() => setChosenDelivery({ name: 'Delivery', price: '5.90' })}
              />
            </View>
          </View>
        </View>
      </View>

      <View style={modal.shippingContainer}>
        <View style={modal.shippingTitle}>
          <Title>Payment</Title>
          <MaterialIcons name="payment" size={24} color={styling.colors.Asphalt} />
        </View>
        <View style={modal.shippingOptionsContainer}>
          <View style={modal.shippingOptionItem}>
            <View style={modal.shippingOptionText}>
              <Text>MobilePay</Text>
              <Caption>Choose MobilePay for payment.</Caption>
            </View>
            <View style={modal.shippingOptionButton}>
              <RadioButton
                value="MobilePay"
                color={styling.colors.Asphalt}
                status={ chosenPayment.name === 'MobilePay' ? 'checked' : 'unchecked' }
                onPress={() => setChosenPayment({ name: 'MobilePay', price: '0' })}
              />
            </View>
          </View>
          <Divider />
          <View style={modal.shippingOptionItem}>
            <View style={modal.shippingOptionText}>
              <Text>Cash</Text>
              <Caption>Choose cash for payment, can only be used for Pickup.</Caption>
            </View>
            <View style={modal.shippingOptionButton}>
              <RadioButton
                value="Cash"
                color={styling.colors.Asphalt}
                status={ chosenPayment.name === 'Cash' ? 'checked' : 'unchecked' }
                onPress={() => setChosenPayment({ name: 'Cash', price: '2.50' })}
              />
            </View>
          </View>
        </View>
      </View>

      <Divider />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginRight: 20, }}>
          <Title>Summary</Title>
          <Entypo name="price-tag" size={24} color={styling.colors.Asphalt} />
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-start', marginRight: 10 }}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
            <Text>Product price :</Text>
            <Text>{getCurrentProduct.productPrice} €</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
            <Text>Shipping :</Text>
            <Text>{chosenDelivery.price} €</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
            <Text>Payment :</Text>
            <Text>{chosenPayment.price} €</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 2, alignItems: 'center' }}>
            <View style={{ backgroundColor: styling.colors.Asphalt, borderWidth: 2 }}>
              <Text style={{ color: styling.colors.VistaWhite }}>Total :</Text>
            </View>
            <Text>{orderTotalPrice} €</Text>
          </View>

        </View>
      </View>

      <Divider style={{ marginBottom: 5 }} />

      <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
        <Button style={{ width: '90%' }} disabled={false} loading={false} icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
          <Text>sadas</Text>
        </Button>
      </View>


      </Modal>
    </Portal>
  );
};

// Export "Checkout" component, so other components like "App.js" are able to use this hooks's content.
export default Checkout;
