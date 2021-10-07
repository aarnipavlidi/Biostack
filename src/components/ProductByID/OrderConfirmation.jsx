// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { useHistory, useLocation } from 'react-router-native'; // Import following functions from "react-router-native" library's content for this component usage.
import { ScrollView, View, StyleSheet, Text, Image, Pressable } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Appbar, Card, Title, Divider } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.
import { AntDesign } from '@expo/vector-icons'; // Import following components from "@expo/vector-icons" libary for this component usage.

import ProductImage from '../Profile/Transactions/ProductImage'; // Import "ProductImage" component from "ProductImage.jsx" file for this component usage.
import styling from '../../styling'; // Import "styling" variable from "styling.js" for this component usage.

const headerContainer = StyleSheet.create({
  appBarContainer: {
    backgroundColor: styling.colors.Asphalt,
    height: 50,
  },
  appBarContent: {
    color: styling.colors.VistaWhite,
    fontFamily: styling.fonts.loginScreenTitle
  }
});

const orderContainer = StyleSheet.create({
  mainContainer: {
    margin: 10,
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: styling.colors.VistaWhite,
  },
  confirmationFlexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  productSummary: {
    flex: 1,
    marginLeft: 3
  },
  productValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  productBox: {
    marginLeft: 5,
    marginRight: 5
  },
  productBoxStyle: {
    backgroundColor: styling.colors.Asphalt,
    borderRadius: 10 / 2,
    elevation: 5,
  },
  productBoxContent: {
    color: styling.colors.VistaWhite,
    fontFamily: styling.fonts.buttonContent,
    fontSize: 12,
    padding: 5,
  },
  productValueBox: {
    flex: 1,
    marginRight: 5
  },
  productValueContent: {
    textAlign: 'right',
  },
});

const emailContainer = StyleSheet.create({
  container: {
    marginTop: 10,
    borderBottomWidth: 2.5,
    borderBottomColor: styling.colors.Asphalt,
    borderTopWidth: 2.5,
    borderTopColor: styling.colors.Asphalt,
  },
  content: {
    padding: 10,
    fontFamily: styling.fonts.buttonContent,
    fontSize: 14,
    textAlign: 'center',
  },
});

const buttonContainer = StyleSheet.create({
  productButtonContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
  productButton: {
    backgroundColor: styling.colors.Asphalt,
    flex: 1.25/3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    elevation: 5,
  },
  productButtonText: {
    color: styling.colors.VistaWhite,
    fontFamily: styling.fonts.buttonContent,
    fontSize: 12,
    marginRight: 5,
  },
});

const OrderConfirmation = () => {

  const location = useLocation(); // Define "location" variable, which will execute => "useLocation(...)" function.
  const history = useHistory(); // Define "history" variable, which will execute => "useHistory(...)" function.

  // Define "getOrderData" variable, which is equal to "location.state.detail". So after user
  // has purchased the product successfully, then that order data goes into "location.state.detail"
  // and user will be redirected to this component (OrderConfirmation), which will show that data back.
  const getOrderData = location.state.detail;
  const orderNumber = `#${getOrderData._id}`;

  return (
    <ScrollView>
      <Appbar.Header statusBarHeight={0} style={headerContainer.appBarContainer}>
        <Appbar.Content titleStyle={headerContainer.appBarContent} title="Order Confirmation" subtitle={orderNumber} subtitleStyle={headerContainer.appBarContent} />
        <Appbar.Action icon="checkbox-marked-circle-outline" />
      </Appbar.Header>
      <Card style={orderContainer.mainContainer}>
        <Card.Content>
          <View style={{ alignItems: 'center' }}>
            <AntDesign name="checkcircleo" size={30} color={styling.colors.Greenery} />
            <Title style={{ fontFamily: styling.fonts.buttonContent, fontSize: 15, textAlign: 'center', marginTop: 10 }}>You have successfully purchased item from the app.</Title>
          </View>
          <View style={orderContainer.confirmationFlexBox}>
            <View>
              <ProductImage getImageName={getOrderData.productType} getImageValue={getOrderData.productImage} />
            </View>
            <View style={orderContainer.productSummary}>
              <View style={orderContainer.productValueContainer}>
                <View style={orderContainer.productBox}>
                  <View style={orderContainer.productBoxStyle}>
                    <Text style={orderContainer.productBoxContent}>PRODUCT</Text>
                  </View>
                </View>
                <View style={orderContainer.productValueBox}>
                  <Text style={orderContainer.productValueContent}>{getOrderData.productTitle}</Text>
                </View>
              </View>
              <Divider />
              <View style={orderContainer.productValueContainer}>
                <View style={orderContainer.productBox}>
                  <View style={orderContainer.productBoxStyle}>
                    <Text style={orderContainer.productBoxContent}>TYPE</Text>
                  </View>
                </View>
                <View style={orderContainer.productValueBox}>
                  <Text style={orderContainer.productValueContent}>{getOrderData.productType}</Text>
                </View>
              </View>
              <Divider />
              <View style={orderContainer.productValueContainer}>
                <View style={orderContainer.productBox}>
                  <View style={orderContainer.productBoxStyle}>
                    <Text style={orderContainer.productBoxContent}>SIZE</Text>
                  </View>
                </View>
                <View style={orderContainer.productValueBox}>
                  <Text style={orderContainer.productValueContent}>{getOrderData.productSize}</Text>
                </View>
              </View>
              <Divider />
              <View style={orderContainer.productValueContainer}>
                <View style={orderContainer.productBox}>
                  <View style={orderContainer.productBoxStyle}>
                    <Text style={orderContainer.productBoxContent}>DELIVERY</Text>
                  </View>
                </View>
                <View style={orderContainer.productValueBox}>
                  <Text style={orderContainer.productValueContent}>{getOrderData.shippingMethod}</Text>
                </View>
              </View>
              <Divider />
              <View style={orderContainer.productValueContainer}>
                <View style={orderContainer.productBox}>
                  <View style={orderContainer.productBoxStyle}>
                    <Text style={orderContainer.productBoxContent}>PAYMENT</Text>
                  </View>
                </View>
                <View style={orderContainer.productValueBox}>
                  <Text style={orderContainer.productValueContent}>{getOrderData.paymentMethod}</Text>
                </View>
              </View>
              <Divider />
              <View style={orderContainer.productValueContainer}>
                <View style={orderContainer.productBox}>
                  <View style={orderContainer.productBoxStyle}>
                    <Text style={orderContainer.productBoxContent}>TOTAL</Text>
                  </View>
                </View>
                <View style={orderContainer.productValueBox}>
                  <Text style={orderContainer.productValueContent}>{getOrderData.paymentTotal} €</Text>
                </View>
              </View>
              <Divider />
            </View>
          </View>
          <View style={emailContainer.container}>
            <Text style={emailContainer.content}>Confirmation of your order has been sent to your email. Thank you for using Biostack and supporting circular economy.</Text>
          </View>
          <View style={buttonContainer.productButtonContainer}>
            <Pressable style={buttonContainer.productButton} onPress={() => history.push('/dashboard')}>
              <Text style={buttonContainer.productButtonText}>BUY MORE</Text>
            </Pressable>
            <Pressable style={buttonContainer.productButton} onPress={() => history.push(`/dashboard/profile/transactions/${getOrderData._id}`)}>
              <Text style={buttonContainer.productButtonText}>CONTACT SELLER</Text>
            </Pressable>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

// Export "OrderConfirmation" component, so other components like "App.js" are able to use this hooks's content.
export default OrderConfirmation;
