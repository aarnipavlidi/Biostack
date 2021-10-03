// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react'; // Import "react" library's content for this component usage.
import { ImageBackground, View, Text, StyleSheet } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Modal, Portal, Title } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.
import { AntDesign  } from '@expo/vector-icons'; // Import following components from "@expo/vector-icons" libary for this component usage.

import styling from '../../../styling'; // Import "styling" variable from "styling.js" for this component usage.

const modal = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fbfbfb',
    marginTop: -75,
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
              <Text style={{ color: styling.colors.Asphalt, textAlign: 'center', padding: 5, }}>{getCurrentTransaction.buyerName ? getCurrentTransaction.buyerName : getCurrentTransaction.sellerName}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 10 }} >
            <View style={{ flex: 1/2, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ backgroundColor: styling.colors.Asphalt, color: styling.colors.VistaWhite, textAlign: 'center', fontFamily: styling.fonts.buttonContent, padding: 5, width: '70%' }}>Email</Text>
            </View>
            <View style={{ flex: 1/2 }}>
              <Text style={{ color: styling.colors.Asphalt, textAlign: 'center', padding: 5, }}>{getCurrentTransaction.buyerEmail ? getCurrentTransaction.buyerEmail : getCurrentTransaction.sellerEmail}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 10 }} >
            <View style={{ flex: 1/2, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ backgroundColor: styling.colors.Asphalt, color: styling.colors.VistaWhite, textAlign: 'center', fontFamily: styling.fonts.buttonContent, padding: 5, width: '70%' }}>City</Text>
            </View>
            <View style={{ flex: 1/2 }}>
              <Text style={{ color: styling.colors.Asphalt, textAlign: 'center', padding: 5, }}>{getCurrentTransaction.location.city}</Text>
            </View>
          </View>
        </View>




      </Modal>
    </Portal>
  );
};

// Export "ContactPerson" component, so other components like "App.js" are able to use this hooks's content.
export default ContactPerson;
