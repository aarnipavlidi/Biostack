// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { ScrollView, View, StyleSheet, Text, Image } from 'react-native'; // Import following components from "react-native" library for this component usage.
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

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header statusBarHeight={0} style={headerContainer.appBarContainer}>
        <Appbar.Content titleStyle={headerContainer.appBarContent} title="Order Confirmation" />
        <Appbar.Action icon="heart-outline" />
      </Appbar.Header>

      <Card style={{ margin: 10, elevation: 10, justifyContent: 'center', alignItems: 'center', flexGrow: 1, backgroundColor: styling.colors.VistaWhite }}>
        <Card.Content>

          <View style={{ alignItems: 'center' }}>
            <AntDesign name="checkcircleo" size={50} color={styling.colors.Greenery} />
            <Title style={{ textAlign: 'center' }}>You have successfully purchased second-hand from the app.</Title>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <View>
              <Image style={{ width: 125, height: 125, borderRadius: 25 / 2 }} source={{ uri: 'https://picsum.photos/125/125?grayscale'}} />
            </View>

            <View style={{ flex: 1, marginLeft: 5 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 5 }}>
                <View style={{ marginLeft: 5, marginRight: 5 }}>
                  <View style={{ backgroundColor: styling.colors.Asphalt, borderRadius: 10 / 2, elevation: 8 }}>
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
                  <View style={{ backgroundColor: styling.colors.Asphalt, borderRadius: 10 / 2, elevation: 8 }}>
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
                  <View style={{ backgroundColor: styling.colors.Asphalt, borderRadius: 10 / 2, elevation: 8 }}>
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
                  <View style={{ backgroundColor: styling.colors.Asphalt, borderRadius: 10 / 2, elevation: 8 }}>
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
                  <View style={{ backgroundColor: styling.colors.Asphalt, borderRadius: 10 / 2, elevation: 8 }}>
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
                  <View style={{ backgroundColor: styling.colors.Asphalt, borderRadius: 10 / 2, elevation: 8 }}>
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


        </Card.Content>
      </Card>


    </View>
  );
};

// Export "OrderConfirmation" component, so other components like "App.js" are able to use this hooks's content.
export default OrderConfirmation;
