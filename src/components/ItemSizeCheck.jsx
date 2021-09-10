// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import following components from "@expo/vector-icons" libary for this component usage.
import styling from '../styling'; // Import "styling" variable from "styling.js" for this component usage.

const ItemSizeCheck = ({ currentItemSize }) => {

  if (currentItemSize === 'XS') {
    return (
      <MaterialCommunityIcons name="size-xs" size={24} color={styling.colors.Asphalt} />
    );
  };

  if (currentItemSize === 'S') {
    return (
      <MaterialCommunityIcons name="size-s" size={24} color={styling.colors.Asphalt} />
    );
  };

  if (currentItemSize === 'M') {
    return (
      <MaterialCommunityIcons name="size-m" size={24} color={styling.colors.Asphalt} />
    );
  };

  if (currentItemSize === 'L') {
    return (
      <MaterialCommunityIcons name="size-l" size={24} color={styling.colors.Asphalt} />
    );
  };

  if (currentItemSize === 'XL') {
    return (
      <MaterialCommunityIcons name="size-xl" size={24} color={styling.colors.Asphalt} />
    );
  };

  if (currentItemSize === 'XXL') {
    return (
      <MaterialCommunityIcons name="size-xxl" size={24} color={styling.colors.Asphalt} />
    );
  } else {
    return (
      <MaterialCommunityIcons name="size-l" size={24} color={styling.colors.Asphalt} />
    );
  };
};

// Export "ItemSizeCheck" component, so other components like "App.js" are able to use this hooks's content.
export default ItemSizeCheck;
