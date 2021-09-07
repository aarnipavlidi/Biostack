// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { ScrollView, View, StyleSheet, Text, Image, Pressable } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Appbar, Card, Title, Divider } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.
import { AntDesign } from '@expo/vector-icons'; // Import following components from "@expo/vector-icons" libary for this component usage.

import styling from '../../styling'; // Import "styling" variable from "styling.js" for this component usage.

const headerContainer = StyleSheet.create({
  appBarContainer: {
    backgroundColor: styling.colors.Asphalt,
    height: 50,
  },
  appBarContent: {
    color: styling.colors.VistaWhite
  }
});

const buttonContainer = StyleSheet.create({
  productButtonContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  productButton: {
    backgroundColor: styling.colors.Asphalt,
    flex: 1/2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    elevation: 5,
  },
  productButtonText: {
    color: styling.colors.VistaWhite,
    fontSize: 18,
    marginRight: 5,
  },
});

const OrderConfirmation = () => {

  const getOrderData = {
    _id: "6134f2843c8d4668580d2319",
    date: "1630859907146",
    paymentMethod: "MobilePay",
    paymentTotal: "100",
    productGroupName: "t-shirt",
    productID: "6134d6a03c8d4668580d2224",
    productPrice: "100",
    productSize: "L",
    productTitle: "Random product",
    sellerID: "612dd3fb577665133ce4947e",
    sellerName: "Aarni Pavlidi",
    shippingMethod: "Pickup",
    type: "Purchased",
  };

  const orderNumber = `#${getOrderData._id}`;

  return (
    <ScrollView>
      <Appbar.Header statusBarHeight={0} style={headerContainer.appBarContainer}>
        <Appbar.Content titleStyle={headerContainer.appBarContent} title="Order Confirmation" subtitle={orderNumber} subtitleStyle={headerContainer.appBarContent} />
        <Appbar.Action icon="checkbox-marked-circle-outline" />
      </Appbar.Header>

      <Card style={{ margin: 10, elevation: 6, justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: styling.colors.VistaWhite }}>
        <Card.Content>

          <View style={{ alignItems: 'center' }}>
            <AntDesign name="checkcircleo" size={50} color={styling.colors.Greenery} />
            <Title style={{ textAlign: 'center', marginTop: 10 }}>You have successfully purchased item from the app.</Title>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <View>
              <Image style={{ width: 125, height: 125, borderRadius: 25 / 2 }} source={{ uri: 'https://picsum.photos/125/125?grayscale'}} />
            </View>
            <View style={{ flex: 1, marginLeft: 3 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 5 }}>
                <View style={{ marginLeft: 5, marginRight: 5 }}>
                  <View style={{ backgroundColor: styling.colors.Asphalt, borderRadius: 10 / 2, elevation: 5 }}>
                    <Text style={{ color: styling.colors.VistaWhite, padding: 5 }}>Product</Text>
                  </View>
                </View>
                <View style={{ flex: 1, marginRight: 5 }}>
                  <Text style={{ textAlign: 'right' }}>{getOrderData.productTitle}</Text>
                </View>
              </View>
              <Divider />
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 5 }}>
                <View style={{ marginLeft: 5, marginRight: 5 }}>
                  <View style={{ backgroundColor: styling.colors.Asphalt, borderRadius: 10 / 2, elevation: 5 }}>
                    <Text style={{ color: styling.colors.VistaWhite, padding: 5 }}>Type</Text>
                  </View>
                </View>
                <View style={{ flex: 1, marginRight: 5 }}>
                  <Text style={{ textAlign: 'right' }}>{getOrderData.productGroupName}</Text>
                </View>
              </View>
              <Divider />
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 5 }}>
                <View style={{ marginLeft: 5, marginRight: 5 }}>
                  <View style={{ backgroundColor: styling.colors.Asphalt, borderRadius: 10 / 2, elevation: 5 }}>
                    <Text style={{ color: styling.colors.VistaWhite, padding: 5 }}>Size</Text>
                  </View>
                </View>
                <View style={{ flex: 1, marginRight: 5 }}>
                  <Text style={{ textAlign: 'right' }}>{getOrderData.productSize}</Text>
                </View>
              </View>
              <Divider />
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 5 }}>
                <View style={{ marginLeft: 5, marginRight: 5 }}>
                  <View style={{ backgroundColor: styling.colors.Asphalt, borderRadius: 10 / 2, elevation: 5 }}>
                    <Text style={{ color: styling.colors.VistaWhite, padding: 5 }}>Delivery</Text>
                  </View>
                </View>
                <View style={{ flex: 1, marginRight: 5 }}>
                  <Text style={{ textAlign: 'right' }}>{getOrderData.shippingMethod}</Text>
                </View>
              </View>
              <Divider />
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 5 }}>
                <View style={{ marginLeft: 5, marginRight: 5 }}>
                  <View style={{ backgroundColor: styling.colors.Asphalt, borderRadius: 10 / 2, elevation: 5 }}>
                    <Text style={{ color: styling.colors.VistaWhite, padding: 5 }}>Payment</Text>
                  </View>
                </View>
                <View style={{ flex: 1, marginRight: 5 }}>
                  <Text style={{ textAlign: 'right' }}>{getOrderData.paymentMethod}</Text>
                </View>
              </View>
              <Divider />
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 5 }}>
                <View style={{ marginLeft: 5, marginRight: 5 }}>
                  <View style={{ backgroundColor: styling.colors.Asphalt, borderRadius: 10 / 2, elevation: 5 }}>
                    <Text style={{ color: styling.colors.VistaWhite, padding: 5 }}>Total</Text>
                  </View>
                </View>
                <View style={{ flex: 1, marginRight: 5 }}>
                  <Text style={{ textAlign: 'right' }}>{getOrderData.paymentTotal} €</Text>
                </View>
              </View>
              <Divider />
            </View>
          </View>

          <View style={{ marginTop: 10, borderBottomWidth: 2, borderBottomColor: styling.colors.Asphalt, borderTopWidth: 2, borderTopColor: styling.colors.Asphalt }}>
            <Text style={{ padding: 9, fontSize: 15, textAlign: 'center' }}>Confirmation of your order has been sent to your email. Thank you for using Biostack and supporting circular economy.</Text>
          </View>


          <View style={buttonContainer.productButtonContainer}>
            <Pressable style={buttonContainer.productButton}>
              <Text style={buttonContainer.productButtonText}>Buy more</Text>
            </Pressable>
            <Pressable style={buttonContainer.productButton}>
              <Text style={buttonContainer.productButtonText}>Contact seller</Text>
            </Pressable>
          </View>

        </Card.Content>
      </Card>

    </ScrollView>
  );
};

// Export "OrderConfirmation" component, so other components like "App.js" are able to use this hooks's content.
export default OrderConfirmation;
