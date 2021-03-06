// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react'; // Import "react" library's content for this component usage.
import { useHistory } from 'react-router-native'; // Import following components from "react-router-native" library's content for this component usage.
import { Alert, ActivityIndicator, ScrollView, View, StyleSheet, Text, Image, Pressable } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Avatar, Appbar, Card, IconButton, Title, Paragraph, Divider, Provider } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.
//import { Marker } from 'react-native-maps';
import MapView, { Marker, Callout } from 'react-native-maps'; // Import following components from "react-native-maps" library for this component usage.
import { FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; // Import following components from "@expo/vector-icons" libary for this component usage.

import useCurrentTransaction from '../../../hooks/useCurrentTransaction'; // Import "useCurrentTransaction" hook from "useCurrentTransaction.js" file for this component usage.
import useCreateNewRating from '../../../hooks/useCreateNewRating'; // Import "useCreateNewRating" hook "useCreateNewRating.js" file for this component usage.
import ProductImage from './ProductImage'; // Import "ProductImage" component from "ProductImage.jsx" file for this component usage.
import ContactPerson from './ContactPerson'; // Import "ContactPerson" component from "ContactPerson.jsx" file for this component usage.
import RatingValue from './RatingValue'; // Import "RatingValue" component from "RatingValue.jsx" file for this component usage.

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

const CurrentTransaction = ({ currentUserData, loading, showSnackBar }) => {

  // Define "useCurrentTransaction(...)" hook, then get access into "getCurrentTransaction"
  // and "loadingTransaction" variables. When user goes into specific transaction, app will
  // execute hook and show current data back into "getCurrentTransaction" variable. If the
  // data is loading, which means "loadingTransaction" is === "true", then component will
  // render back "loading spinner" untill data has been completely loaded.
  const { getCurrentTransaction, loadingTransaction } = useCurrentTransaction();

  // Define "useCreateNewRating()" hook, then get access into "submitNewRating" function
  // and "loadingRating" variable. When user wants to give rating to the current transaction
  // buyer/seller, then component will execute "submitNewRating" function. When executing
  // function, we will be using 3x different parameters, "getCurrentTransaction._id",
  // "currentRating.value" and "getCurrentTransaction.type".
  const [submitNewRating, { loadingRating }] = useCreateNewRating(); // Define "submitNewRating" variable from => "useCreateNewRating(...)" hook.

  // Define "currentRating" into state, which will get in default two (2) object values
  // => "status" === "false" and "value" == "null". If we want to change "currentRating"
  // state, we will be using "setCurrentRating" function.
  const [currentRating, setCurrentRating] = useState({ status: false, value: null });

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // Define "submitRating" variable which will execute everything inside of {...} when
  // being referenced. Function executes "submitNewRating" function with given parameter
  // values and once the function returns data, we will be using that data into rendering
  // "Snackbar" component via using "showSnackBar" function, which will notify user of
  // giving successful rating value to the products buyer/seller.
  const submitRating = async () => {
    try { // We will try execute first "try" section, if there are any problems then we will execute "catch" section.
      const { data } = await submitNewRating(getCurrentTransaction._id, currentRating.value, getCurrentTransaction.type);
      showSnackBar(data.giveRatingUser.response); // Execute "showSnackBar" function, with given parameter value.
    } catch (error) { // If there any problems during executing the function then we will do "catch" section.
      console.log(error.message) // Console.log "error.message" variable back to the terminal.
    };
  };

  // Define "confirmSubmitRating" function, which will execute everything inside of {...}, when being referenced.
  // So when user has chosen the given rating value (1, 2 or 3) and user pressed the "submit" button, then user
  // will asked to confirm of giving the rating. Once user has decided to confirm, then we will execute the
  // "submitRating" function and execute the "submitNewRating" function (hook).
  const confirmSubmitRating = () => {
    Alert.alert(
      "Biostack",
      `You are giving rating value of ${currentRating.value} to the user. Are you sure and want to proceed?`,
      [
        {
          text: "CANCEL",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => submitRating(),
        }
      ]
    )
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
        <ContactPerson visible={visible} hideModal={hideModal} getCurrentTransaction={getCurrentTransaction} />
        <Appbar.Header style={headerContainer.appBarContainer} statusBarHeight={0}>
          <Appbar.BackAction onPress={goBackPreviousRoute} />
          <Appbar.Content style={headerContainer.appBarContent} title={getCurrentTransaction.productTitle} titleStyle={{ fontFamily: 'PermanentMarker_400Regular' }} subtitle={`#${getCurrentTransaction._id}`} subtitleStyle={{ fontFamily: 'PermanentMarker_400Regular' }} />
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
                      <Text style={orderContainer.productBoxContent}>PRODUCT</Text>
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
                      <Text style={orderContainer.productBoxContent}>TYPE</Text>
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
                      <Text style={orderContainer.productBoxContent}>SIZE</Text>
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
                      <Text style={orderContainer.productBoxContent}>DELIVERY</Text>
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
                      <Text style={orderContainer.productBoxContent}>PAYMENT</Text>
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
                      <Text style={orderContainer.productBoxContent}>TOTAL</Text>
                    </View>
                  </View>
                  <View style={orderContainer.productValueBox}>
                    <Text style={orderContainer.productValueContent}>{getCurrentTransaction.paymentTotal} ???</Text>
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
          titleStyle={{ fontFamily: styling.fonts.buttonContent, fontSize: 20 }}
          subtitle={getCurrentTransaction.type === "Purchased" ? "Product seller contact information." : "Product buyer contact information."}
          subtitleStyle={{ fontFamily: styling.fonts.buttonContent }}
          left={(props) => <Avatar.Icon {...props} style={{ backgroundColor: styling.colors.Asphalt }} icon="email-multiple-outline" />}
          right={(props) => <IconButton {...props} icon="chevron-right" onPress={showModal} />}
        />


        <View style={{ height: 150, width: '90%', alignSelf: 'center', marginTop: 5, marginBottom: 5 }}>
          <MapView style={{ alignSelf: 'stretch', height: '100%' }} region={{ latitude: parseFloat(getCurrentTransaction.location.latitude), longitude: parseFloat(getCurrentTransaction.location.longitude), latitudeDelta: 0.09, longitudeDelta: 0.09}}>
            <Marker coordinate={{ latitude: parseFloat(getCurrentTransaction.location.latitude), longitude: parseFloat(getCurrentTransaction.location.longitude), latitudeDelta: 0.09, longitudeDelta: 0.09}} title={getCurrentTransaction.buyerName ? getCurrentTransaction.buyerName : getCurrentTransaction.sellerName} />
          </MapView>
        </View>


        <Card style={{ marginTop: 5, marginBottom: 5, backgroundColor: styling.colors.VistaWhite, width: '90%', alignSelf: 'center', elevation: 5 }}>
          <Card.Content>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flex: 1 }}>
              <View style={{ flex: 2.5/3 }}>
                <Title style={{ fontFamily: styling.fonts.buttonContent, fontSize: 19 }}>{getCurrentTransaction.type === "Purchased" ? "Rate seller" : "Rate buyer"}</Title>
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
                <RatingValue getTransactionStatus={getCurrentTransaction.ratingStatus} getTransactionValue={getCurrentTransaction.ratingValue} currentRating={currentRating} setCurrentRating={setCurrentRating} />
                {!currentRating.value && getCurrentTransaction.ratingValue === 0
                  ? <Paragraph>Please give a rating first.</Paragraph>
                  : currentRating.value && getCurrentTransaction.ratingValue === 0
                  ? <Paragraph>Current rating chosen: {currentRating.value}</Paragraph>
                  : <Paragraph>You gave rating value of {getCurrentTransaction.ratingValue} to the current product {getCurrentTransaction.type === "Purchased" ? "seller" : "buyer"}.</Paragraph>}
              </View>
              <Pressable disabled={currentRating.status === false || getCurrentTransaction.ratingValue ? true : false} onPress={confirmSubmitRating} style={{ backgroundColor: styling.colors.Asphalt, borderRadius: 40 / 2 }}>
                {getCurrentTransaction.ratingStatus === false
                  ? <MaterialCommunityIcons style={{ padding: 10 }} name="account-arrow-right-outline" size={22} color={styling.colors.VistaWhite} />
                  : <Ionicons style={{ padding: 10 }} name="checkmark-sharp" size={22} color={styling.colors.VistaWhite} />}
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
