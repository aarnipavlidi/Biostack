// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { ImageBackground, View, Text, StyleSheet, Linking } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Modal, Portal, Title, Button } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.
import { AntDesign  } from '@expo/vector-icons'; // Import following components from "@expo/vector-icons" libary for this component usage.

import styling from '../../../styling'; // Import "styling" variable from "styling.js" for this component usage.

const modal = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fbfbfb',
    marginLeft: 10,
    marginRight: 10,
  },
  headerContent: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    backgroundColor: styling.colors.Asphalt,
    borderColor: styling.colors.Asphalt,
    borderRadius: 40 / 2,
    marginTop: 10,
    marginRight: 5,
  },
  title: {
    padding: 9,
    color: styling.colors.VistaWhite,
    fontFamily: styling.fonts.buttonContent
  },
});

const ContactPerson = ({ visible, hideModal, getCurrentTransaction }) => {

  const getTransactionID = getCurrentTransaction._id;
  const getPersonName = getCurrentTransaction.buyerName ? getCurrentTransaction.buyerName : getCurrentTransaction.sellerName;
  const getPersonEmail = getCurrentTransaction.buyerEmail ? getCurrentTransaction.buyerEmail : getCurrentTransaction.sellerEmail;
  const getPersonLocation = getCurrentTransaction.location.city;

  const sendEmailPerson = () => {
    Linking.openURL(`mailto:${getPersonEmail}?subject=#${getTransactionID} | Biostack&body=Hey ${getPersonName}, contacting you regarding this order! <3`);
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={modal.mainContainer}>

        <View>
          <ImageBackground style={{ height: 100, width: '100%' }} resizeMode="cover" source={require('../../../../assets/images/clothes/quino-al-xhGMQ_nYWqU-unsplash.jpg')}>
            <View style={modal.headerContent}>
              <View style={modal.headerTitle}>
                <Title style={modal.title}>Contact</Title>
              </View>
            </View>
          </ImageBackground>
        </View>


        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <View style={{ flexDirection: 'row', marginTop: 10 }} >
            <View style={{ flex: 1/2, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ backgroundColor: styling.colors.Asphalt, color: styling.colors.VistaWhite, textAlign: 'center', fontFamily: styling.fonts.buttonContent, padding: 5, width: '70%' }}>Name</Text>
            </View>
            <View style={{ flex: 1/2 }}>
              <Text style={{ color: styling.colors.Asphalt, textAlign: 'center', padding: 5, }}>{getPersonName}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 10 }} >
            <View style={{ flex: 1/2, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ backgroundColor: styling.colors.Asphalt, color: styling.colors.VistaWhite, textAlign: 'center', fontFamily: styling.fonts.buttonContent, padding: 5, width: '70%' }}>Email</Text>
            </View>
            <View style={{ flex: 1/2 }}>
              <Text style={{ color: styling.colors.Asphalt, textAlign: 'center', padding: 5, }}>{getPersonEmail}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 10 }} >
            <View style={{ flex: 1/2, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ backgroundColor: styling.colors.Asphalt, color: styling.colors.VistaWhite, textAlign: 'center', fontFamily: styling.fonts.buttonContent, padding: 5, width: '70%' }}>Number</Text>
            </View>
            <View style={{ flex: 1/2 }}>
              <Text style={{ color: styling.colors.Asphalt, textAlign: 'center', padding: 5, }}>123 123 123</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 10 }} >
            <View style={{ flex: 1/2, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ backgroundColor: styling.colors.Asphalt, color: styling.colors.VistaWhite, textAlign: 'center', fontFamily: styling.fonts.buttonContent, padding: 5, width: '70%' }}>City</Text>
            </View>
            <View style={{ flex: 1/2 }}>
              <Text style={{ color: styling.colors.Asphalt, textAlign: 'center', padding: 5, }}>{getPersonLocation}</Text>
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: styling.colors.Asphalt, marginTop: 15, marginBottom: 15, width: '90%', alignSelf: 'center' }}>
          <Button color={styling.colors.VistaWhite} onPress={sendEmailPerson}>
            <Text style={{ fontFamily: styling.fonts.buttonContent, fontSize: 12 }}>Send email</Text>
          </Button>
        </View>


      </Modal>
    </Portal>
  );
};

// Export "ContactPerson" component, so other components like "App.js" are able to use this hooks's content.
export default ContactPerson;
