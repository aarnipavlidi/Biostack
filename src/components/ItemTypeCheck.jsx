// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this component usage.
import { Image } from 'react-native'; // Import following components from "react-native" library for this component usage.

const ItemTypeCheck = ({ currentItemType }) => {

  if (currentItemType === 't-shirt') {
    return (
      <Image source={require('../../assets/icons/clothes/t-24x24-455076.png')} />
    );
  };

  if (currentItemType === 'hoodie') {
    return (
      <Image source={require('../../assets/icons/clothes/hoodie-24x24-455064.png')} />
    );
  };

  if (currentItemType === 'jacket') {
    return (
      <Image source={require('../../assets/icons/clothes/jacket-24x24-455063.png')} />
    );
  };

  if (currentItemType === 'hat') {
    return (
      <Image source={require('../../assets/icons/clothes/hat-24x24-455060.png')} />
    );
  };

  if (currentItemType === 'sweater') {
    return (
      <Image source={require('../../assets/icons/clothes/sweater-24x24-455072.png')} />
    );
  } else {
    return (
      <Image source={require('../../assets/icons/clothes/t-24x24-455076.png')} />
    );
  };
};

// Export "ItemTypeCheck" component, so other components like "App.js" are able to use this hooks's content.
export default ItemTypeCheck;
