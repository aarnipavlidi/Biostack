// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { View } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Ionicons } from '@expo/vector-icons'; // Import following components from "@expo/vector-icons" libary for this component usage.

import styling from '../styling'; // Import "styling" variable from "styling.js" for this component usage.

const UserRating = ({ currentRating }) => {

  const formatRating = parseInt(currentRating);

  if (formatRating < 1) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Ionicons name="heart-outline" size={22} color={styling.colors.Asphalt} />
        <Ionicons name="heart-outline" size={22} color={styling.colors.Asphalt} />
        <Ionicons name="heart-outline" size={22} color={styling.colors.Asphalt} />
      </View>
    );
  };

  if (formatRating >= 1 && formatRating < 2) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Ionicons name="heart-sharp" size={22} color={styling.colors.Asphalt} />
        <Ionicons name="heart-outline" size={22} color={styling.colors.Asphalt} />
        <Ionicons name="heart-outline" size={22} color={styling.colors.Asphalt} />
      </View>
    );
  };

  if (formatRating >= 2 && formatRating < 3) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Ionicons name="heart-sharp" size={22} color={styling.colors.Asphalt} />
        <Ionicons name="heart-sharp" size={22} color={styling.colors.Asphalt} />
        <Ionicons name="heart-outline" size={22} color={styling.colors.Asphalt} />
      </View>
    );
  };

  if (formatRating >= 3) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Ionicons name="heart-sharp" size={22} color={styling.colors.Asphalt} />
        <Ionicons name="heart-sharp" size={22} color={styling.colors.Asphalt} />
        <Ionicons name="heart-sharp" size={22} color={styling.colors.Asphalt} />
      </View>
    );
  };
};

// Export "UserRating" component, so other components like "App.js" are able to use this hooks's content.
export default UserRating;
