// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react'; // Import "react" library's content for this component usage.
import { useHistory } from 'react-router-native'; // Import following functions from "react-router-native" library's content for this component usage.
import { ImageBackground, View, Text, StyleSheet } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Modal, Portal, Title, Caption, Divider, RadioButton, Button } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.

import useCreateNewTransaction from '../../hooks/useCreateNewTransaction'; // Import "useCreateNewTransaction" hook from "useCreateNewTransaction.js" file for this component usage.
import Constants from 'expo-constants'; // Import "Constants" component from "expo-constants" for this component usage.
import emailjs from 'emailjs-com'; // Import "emailjs" library content from "emailjs-com" for this component usage.

import { Fontisto, Feather, MaterialIcons, Entypo } from '@expo/vector-icons'; // Import following components from "@expo/vector-icons" libary for this component usage.
import ItemSizeCheck from '../ProductChecking/ItemSizeCheck'; // Import "ItemSizeCheck" component from "ItemSizeCheck.jsx" file for this component usage.
import ItemTypeCheck from '../ProductChecking/ItemTypeCheck'; // Import "ItemTypeCheck" component from "ItemTypeCheck.jsx" file for this component usage.

import styling from '../../styling'; // Import "styling" variable from "styling.js" for this component usage.

const modal = StyleSheet.create({
  mainContainer: {
    backgroundColor: styling.colors.VistaWhite,
    marginTop: -10,
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

  // Define "useCreateNewTransaction()" hook and get access "submitNewTransaction" and
  // "loading" variables. With "submitNewTransaction" function, we are able to submit
  // current product info + chosen delivery/payment and execute mutation in order to
  // save order transaction into database. With variable "loading", we are able render
  // "loading spinner" into button (where user is pressing to buy the item), which will
  // keep "spinning" (aka loading) untill it has finished mutation and saved data to db.
  const [submitNewTransaction, { loading }] = useCreateNewTransaction();
  const history = useHistory(); // Define "history" variable, which will execute => "useHistory(...)" function.

  // Define "chosenDelivery" variable into state, which has two (2) different object
  // values, where "name" gets "null" as default and "price" gets "0" as default value.
  const [chosenDelivery, setChosenDelivery] = useState({ name: null, price: '0' });

  // Define "chosenPayment" variable into state, which has two (2) different object
  // values where "name" gets "null" as default and "price" gets "0" as default value.
  const [chosenPayment, setChosenPayment] = useState({ name: null, price: '0' });

  // Define "orderTotalPrice" variable, which will count total value of those three (3)
  // variables value. We are using "Number(...)" function, because those variables are
  // in default "String" type, because they are saved into database as strings!
  const orderTotalPrice = Number(getCurrentProduct.productPrice) + Number(chosenPayment.price) + Number(chosenDelivery.price);

  // Define "preventSubmit" variable, which will be equal to either "false" or
  // "true" value. Variable idea is to prevent the user press "Buy" button, if
  // the user has not chosen "delivery" or "payment" option. So once user has
  // chosen both options, then "preventSubmit" will be equal to "false" value,
  // which means button will be "pressable" to the user.
  const preventSubmit = chosenDelivery.name && chosenPayment.name ? false : true;

  // Define "buttonText" variable, which will execute everything inside of {...},
  // and return text into button => based on if user has selected both payment
  // and delivery option or not. If user (by default) has not chosen any option
  // values, then function will return "Choose shipping & payment" text and
  // otherwise will return "Buy an item" text.
  const buttonText = () => {
    if (chosenDelivery.name && chosenPayment.name) {
      return (
        <Text style={{ color: styling.colors.VistaWhite, fontFamily: styling.fonts.buttonContent, fontSize: 12 }}>Buy an item</Text>
      )
    } else {
      return (
        <Text style={{ color: styling.colors.VistaWhite, fontFamily: styling.fonts.buttonContent, fontSize: 12 }}>Choose shipping & payment</Text>
      )
    };
  };

  // Define "onSubmit" variable, which wll execute everything inside of {...},
  // so basically once user has chosen to buy current product from the app, then
  // this functon wll be executed. We will store current products data into
  // "getOrderData" variable and with that varible we pass it into "submitNewTransaction"
  // function paramater and execute it. If mutation is successful, then user will be
  // redirected to the new page for the "Order confirmation", otherwise we will
  // alert the user and tell the reason why buying (mutation) failed.
  const onSubmit = async () => {

    const currentDate = new Date(); // Define "currentDate" variable, which is equal to following function.

    const getDate = currentDate.getUTCDate(); // Define "getDate" variable, which will get current date.
    const getMonth = currentDate.getUTCMonth() + 1; // Define "getMonth" variable, which will get current month.
    const getYear = currentDate.getUTCFullYear(); // Define "getYear" variable, which will get current year.

    // Define "showCurrentDate" variable, which show all those 3x variable
    // datas and between each value we add "/", so for example when user is
    // buying new item from the app, then "date" object will be equal to
    // for example => "11/9/2021".
    const showCurrentDate = getDate + "/" + getMonth + "/" + getYear;

    // Define "getOrderData" variable, which will get objects inside of {...}.
    const getOrderData = {
      date: showCurrentDate,
      productID: getCurrentProduct._id,
      productTitle: getCurrentProduct.productTitle,
      productSize: getCurrentProduct.productSize,
      productPrice: getCurrentProduct.productPrice,
      productType: getCurrentProduct.productImage.name,
      productImage: getCurrentProduct.productImage.value,
      sellerID: getCurrentProduct.owner._id,
      sellerName: getCurrentProduct.owner.name,
      sellerEmail: getCurrentProduct.owner.email,
      location: {
        city: getCurrentProduct.owner.location.city,
        region_id: getCurrentProduct.owner.location.region_id,
        latitude: getCurrentProduct.owner.location.latitude,
        longitude: getCurrentProduct.owner.location.longitude,
      },
      shippingMethod: chosenDelivery.name,
      paymentMethod: chosenPayment.name,
      paymentTotal: String(orderTotalPrice)
    };

    const emailService = Constants.manifest.extra.email_service_id;
    const emailTemplate = Constants.manifest.extra.email_template_id;
    const emailUser = Constants.manifest.extra.email_user_id;

    // When this function is being referenced, then we wil execute "try" section first,
    // if something goes wrong during this section then we will pass into "catch" section.
    try {
      const response = await submitNewTransaction({ getOrderData }); // Define "response" variable, which will execute following function.
      const confirmationData = response.data.createTransaction;

      const emailOrderConfirmation = {
        to_name: currentUserData.name, // tuotteen ostaja
        to_email: currentUserData.email, // ostajan email
        reply_to: "me@aarnipavlidi.fi",
        orderID: confirmationData._id, // oston id
        orderName: confirmationData.productTitle,
        orderSize: confirmationData.productSize,
        orderType: confirmationData.productType,
        orderImage: confirmationData.productImage,
        orderShipping: confirmationData.shippingMethod,
        orderPayment: confirmationData.paymentMethod,
        orderTotal: confirmationData.paymentTotal,
        sellerName: confirmationData.sellerName,
        contactEmail: confirmationData.sellerEmail,
      };
      history.push({
        pathname: '/dashboard/order-confirmation',
        state: { detail: confirmationData }
      });
      await emailjs.send(emailService, emailTemplate, emailOrderConfirmation, emailUser);
    } catch (error) {
      console.log(error)
    };
  };

  // Component will render everything inside of (...) back to the user.
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
            <ItemTypeCheck currentItemType={getCurrentProduct.productImage.name} />
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

      <View style={{ backgroundColor: styling.colors.Asphalt, marginTop: 15, marginBottom: 15, width: '90%', alignSelf: 'center' }}>
        <Button color={styling.colors.VistaWhite} disabled={preventSubmit} loading={loading} onPress={onSubmit}>
          {buttonText()}
        </Button>
      </View>


      </Modal>
    </Portal>
  );
};

// Export "Checkout" component, so other components like "App.js" are able to use this hooks's content.
export default Checkout;
