// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { View, Pressable } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import following components from "@expo/vector-icons" libary for this component usage.

import styling from '../../../styling'; // Import "stylingg" variable from "stylingg.js" for this component usage.

const RatingValue = ({ getTransactionStatus, getTransactionValue, currentRating, setCurrentRating }) => {

  if (getTransactionStatus && getTransactionValue === 1) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={{ padding: 7 }}>
          <MaterialCommunityIcons name="heart" size={30} color={styling.colors.Asphalt} />
        </View>
        <View style={{ padding: 7 }}>
          <MaterialCommunityIcons name="heart-outline" size={30} color={styling.colors.Asphalt} />
        </View>
        <View style={{ padding: 7 }}>
          <MaterialCommunityIcons name="heart-outline" size={30} color={styling.colors.Asphalt} />
        </View>
      </View>
    );
  };

  if (getTransactionStatus && getTransactionValue === 2) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={{ padding: 7 }}>
          <MaterialCommunityIcons name="heart" size={30} color={styling.colors.Asphalt} />
        </View>
        <View style={{ padding: 7 }}>
          <MaterialCommunityIcons name="heart" size={30} color={styling.colors.Asphalt} />
        </View>
        <View style={{ padding: 7 }}>
          <MaterialCommunityIcons name="heart-outline" size={30} color={styling.colors.Asphalt} />
        </View>
      </View>
    );
  };

  if (getTransactionStatus && getTransactionValue === 3) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={{ padding: 7 }}>
          <MaterialCommunityIcons name="heart" size={30} color={styling.colors.Asphalt} />
        </View>
        <View style={{ padding: 7 }}>
          <MaterialCommunityIcons name="heart" size={30} color={styling.colors.Asphalt} />
        </View>
        <View style={{ padding: 7 }}>
          <MaterialCommunityIcons name="heart" size={30} color={styling.colors.Asphalt} />
        </View>
      </View>
    );
  } else {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Pressable style={{ padding: 7  }} onPress={() => setCurrentRating({ status: true, value: 1 })}>
        {currentRating.value >= 1 && currentRating.value <= 3
          ? <MaterialCommunityIcons name="heart-remove" size={30} color={styling.colors.Asphalt} />
          : <MaterialCommunityIcons name="heart-plus-outline" size={30} color={styling.colors.Asphalt} />}
        </Pressable>
        <Pressable style={{padding: 7 }} onPress={() => setCurrentRating({ status: true, value: 2 })}>
        {currentRating.value >= 2 && currentRating.value <= 3
          ? <MaterialCommunityIcons name="heart-remove" size={30} color={styling.colors.Asphalt} />
          : <MaterialCommunityIcons name="heart-plus-outline" size={30} color={styling.colors.Asphalt} />}
        </Pressable>
        <Pressable style={{ padding: 7 }} onPress={() => setCurrentRating({ status: true, value: 3 })}>
        {currentRating.value === 3
          ? <MaterialCommunityIcons name="heart-remove" size={30} color={styling.colors.Asphalt} />
          : <MaterialCommunityIcons name="heart-plus-outline" size={30} color={styling.colors.Asphalt} />}
        </Pressable>
      </View>
    );
  };
};

// Export "RatingValue" component, so other components like "App.js" are able to use this hooks's content.
export default RatingValue;
