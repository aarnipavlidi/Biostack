// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react'; // Import "react" library's content for this component usage.
import { useHistory } from 'react-router-native'; // Import following components from "react-router-native" library's content for this component usage.
import { ActivityIndicator, ScrollView, View, StyleSheet, Text, Image, Pressable } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Avatar, Appbar, Card, IconButton, Title, Paragraph, Divider, Provider } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.
import { FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; // Import following components from "@expo/vector-icons" libary for this component usage.

import useCurrentTransaction from '../../../hooks/useCurrentTransaction'; // Import "useCurrentTransaction" hook from "useCurrentTransaction.js" file for this component usage.
import useCreateNewRating from '../../../hooks/useCreateNewRating'; // Import "useCreateNewRating" hook "useCreateNewRating.js" file for this component usage.
import ProductImage from './ProductImage'; // Import "ProductImage" component from "ProductImage.jsx" file for this component usage.
import ContactPerson from './ContactPerson'; // Import "ContactPerson" component from "ContactPerson.jsx" file for this component usage.

import styling from '../../../styling'; // Import "styling" variable from "styling.js" for this component usage.

// Define "loadingContainer" variable, which will be used to create style
// if data is "loading" we will return => "loading spinner".
const loadingContainer = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
  },
});

const headerContainer = StyleSheet.create({
  appBarContainer: {
    backgroundColor: styling.colors.Asphalt,
    height: 50
  },
  appBarContent: {
    color: styling.colors.VistaWhite,
  },
});

const orderContainer = StyleSheet.create({
  mainContainer: {
    margin: 10,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: styling.colors.VistaWhite,
    elevation: 5,
  },
  title: {
    marginBottom: 5,
    backgroundColor: styling.colors.VistaWhite,
    alignSelf: 'center',
    elevation: 5,
  },
  titleContent: {
    fontFamily: styling.fonts.buttonContent,
    fontSize: 15,
    padding: 10,
    textAlign: 'center',
    color: styling.colors.Asphalt
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

const CurrentTransaction = ({ currentUserData, loading }) => {

  const [currentRating, setCurrentRating] = useState({ value: 0 });

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const { getCurrentTransaction, loadingTransaction } = useCurrentTransaction();
  const [submitNewRating, { loadingRating }] = useCreateNewRating(); // Define "submitNewRating" variable from => "useCreateNewRating(...)" hook.

  const submitRating = async () => {

    try {
      const { data } = await submitNewRating(getCurrentTransaction._id, currentRating.value, getCurrentTransaction.type);
      console.log(data)
    } catch (error) {
      console.log(error)
    };
  };

  const history = useHistory(); // Define "history" variable, which will execute => "useHistory(...)" function.

  // Define "goBackPreviousRoute" variable, which will execute everything inside
  // of {...}. When app will render this component, user can choose to go back
  // previous route where user was. If for example user came from "Home", then
  // this function will redirect user to => "/dashboard" path when referenced.
  const goBackPreviousRoute = () => {
    history.goBack();
  };

  // If data from the hook "useProducts(...)" is loading, then component
  // will render everything inside of (...) back to the user.
  if (loading || loadingTransaction) {
    return (
      <View style={loadingContainer.container}>
        <ActivityIndicator size="large" color={styling.colors.Asphalt} />
      </View>
    );
  };

  // Otherwise component will render everything inside of (...) back to the user.
  return (
    <ScrollView>
      <Provider>
        <ContactPerson visible={visible} hideModal={hideModal} />
        <Appbar.Header style={headerContainer.appBarContainer} statusBarHeight={0}>
          <Appbar.BackAction onPress={goBackPreviousRoute} />
          <Appbar.Content style={headerContainer.appBarContent} title={getCurrentTransaction.productTitle} titleStyle={{ fontFamily: 'PermanentMarker_400Regular' }} subtitle={getCurrentTransaction._id} subtitleStyle={{ fontFamily: 'PermanentMarker_400Regular' }} />
          <Appbar.Action icon="checkbox-marked-circle-outline" />
        </Appbar.Header>
        <Card style={orderContainer.mainContainer}>
          <Card.Content>
            <View style={orderContainer.title}>
              <Title style={orderContainer.titleContent}>Transaction ({getCurrentTransaction.type.toLowerCase()})</Title>
            </View>
            <View style={orderContainer.confirmationFlexBox}>
              <View>
                <ProductImage getImageName={getCurrentTransaction.productType} getImageValue={getCurrentTransaction.productImage} />
              </View>
              <View style={orderContainer.productSummary}>
                <View style={orderContainer.productValueContainer}>
                  <View style={orderContainer.productBox}>
                    <View style={orderContainer.productBoxStyle}>
                      <Text style={orderContainer.productBoxContent}>Product</Text>
                    </View>
                  </View>
                  <View style={orderContainer.productValueBox}>
                    <Text style={orderContainer.productValueContent}>{getCurrentTransaction.productTitle}</Text>
                  </View>
                </View>
                <Divider />
                <View style={orderContainer.productValueContainer}>
                  <View style={orderContainer.productBox}>
                    <View style={orderContainer.productBoxStyle}>
                      <Text style={orderContainer.productBoxContent}>Type</Text>
                    </View>
                  </View>
                  <View style={orderContainer.productValueBox}>
                    <Text style={orderContainer.productValueContent}>{getCurrentTransaction.productType}</Text>
                  </View>
                </View>
                <Divider />
                <View style={orderContainer.productValueContainer}>
                  <View style={orderContainer.productBox}>
                    <View style={orderContainer.productBoxStyle}>
                      <Text style={orderContainer.productBoxContent}>Size</Text>
                    </View>
                  </View>
                  <View style={orderContainer.productValueBox}>
                    <Text style={orderContainer.productValueContent}>{getCurrentTransaction.productSize}</Text>
                  </View>
                </View>
                <Divider />
                <View style={orderContainer.productValueContainer}>
                  <View style={orderContainer.productBox}>
                    <View style={orderContainer.productBoxStyle}>
                      <Text style={orderContainer.productBoxContent}>Delivery</Text>
                    </View>
                  </View>
                  <View style={orderContainer.productValueBox}>
                    <Text style={orderContainer.productValueContent}>{getCurrentTransaction.shippingMethod}</Text>
                  </View>
                </View>
                <Divider />
                <View style={orderContainer.productValueContainer}>
                  <View style={orderContainer.productBox}>
                    <View style={orderContainer.productBoxStyle}>
                      <Text style={orderContainer.productBoxContent}>Payment</Text>
                    </View>
                  </View>
                  <View style={orderContainer.productValueBox}>
                    <Text style={orderContainer.productValueContent}>{getCurrentTransaction.paymentMethod}</Text>
                  </View>
                </View>
                <Divider />
                <View style={orderContainer.productValueContainer}>
                  <View style={orderContainer.productBox}>
                    <View style={orderContainer.productBoxStyle}>
                      <Text style={orderContainer.productBoxContent}>Total</Text>
                    </View>
                  </View>
                  <View style={orderContainer.productValueBox}>
                    <Text style={orderContainer.productValueContent}>{getCurrentTransaction.paymentTotal} €</Text>
                  </View>
                </View>
                <Divider />
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card.Title
          style={{ marginTop: 5, marginBottom: 5, backgroundColor: styling.colors.VistaWhite, width: '90%', alignSelf: 'center', elevation: 5 }}
          title={getCurrentTransaction.type === "Purchased" ? "Contact seller" : "Contact buyer"}
          subtitle={getCurrentTransaction.type === "Purchased" ? "Product seller contact information." : "Product buyer contact information."}
          left={(props) => <Avatar.Icon {...props} style={{ backgroundColor: styling.colors.Asphalt }} icon="email-multiple-outline" />}
          right={(props) => <IconButton {...props} icon="chevron-right" onPress={showModal} />}
        />

        <Card style={{ backgroundColor: styling.colors.VistaWhite, width: '90%', alignSelf: 'center', elevation: 5 }}>

        <Card.Content>

          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flex: 1 }}>
            <View style={{ flex: 2.5/3 }}>
              <Title>{getCurrentTransaction.type === "Purchased" ? "Rate seller" : "Rate buyer"}</Title>
              <Paragraph>{getCurrentTransaction.type === "Purchased"
                ? "Give a rating to the seller based on how the communication etc. went overall."
                : "Give a rating to the buyer based on how the communication etc. went overall."}
              </Paragraph>
            </View>
            <View style={{ backgroundColor: styling.colors.Asphalt, borderRadius: 40 / 2 }}>
              <FontAwesome5 style={{ padding: 10 }} name="hand-holding-heart" size={20} color={styling.colors.VistaWhite} />
            </View>
          </View>


          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flex: 1 }}>

            <View style={{ flex: 2.5/3 }}>
              <View style={{ flexDirection: 'row' }}>
                <Pressable style={{ padding: 7  }} onPress={() => setCurrentRating({ value: 1 })}>
                {currentRating.value >= 1 && currentRating.value <= 3
                  ? <MaterialCommunityIcons name="heart-remove" size={30} color={styling.colors.Asphalt} />
                  : <MaterialCommunityIcons name="heart-plus-outline" size={30} color={styling.colors.Asphalt} />}
                </Pressable>

                <Pressable style={{padding: 7 }} onPress={() => setCurrentRating({ value: 2 })}>
                {currentRating.value >= 2 && currentRating.value <= 3
                  ? <MaterialCommunityIcons name="heart-remove" size={30} color={styling.colors.Asphalt} />
                  : <MaterialCommunityIcons name="heart-plus-outline" size={30} color={styling.colors.Asphalt} />}
                </Pressable>

                <Pressable style={{ padding: 7 }} onPress={() => setCurrentRating({ value: 3 })}>
                {currentRating.value === 3
                  ? <MaterialCommunityIcons name="heart-remove" size={30} color={styling.colors.Asphalt} />
                  : <MaterialCommunityIcons name="heart-plus-outline" size={30} color={styling.colors.Asphalt} />}
                </Pressable>
              </View>
              <Paragraph>Current rating chosen: {currentRating.value}</Paragraph>
            </View>




            <Pressable onPress={submitRating} style={{ backgroundColor: styling.colors.Asphalt, borderRadius: 40 / 2 }}>
              <MaterialCommunityIcons style={{ padding: 10 }} name="account-arrow-right-outline" size={22} color={styling.colors.VistaWhite} />
            </Pressable>




          </View>




        </Card.Content>

        </Card>

      </Provider>
    </ScrollView>
  );
};

// Export "CurrentTransaction" component, so other components like "App.js" are able to use this hooks's content.
export default CurrentTransaction;
