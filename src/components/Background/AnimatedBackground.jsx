// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useEffect } from 'react'; // Import "react" library's content for this component usage.
import { Animated, Easing, Dimensions } from 'react-native'; // Import following components from "react-native" library for this component usage.

import { BackgoundImage } from './Styling'; // Import following component "BackgoundImage" from "Styling.js" file for this component usage.
import { INPUT_RANGE_START, INPUT_RANGE_END, OUTPUT_RANGE_START, OUTPUT_RANGE_END, ANIMATION_TO_VALUE, ANIMATION_DURATION } from './Constants'; // Import following variables from the "Constants.js" file for this component usage.

const translateIn = {
  inX: -(Dimensions.get('window').width * 0.3),
  inY: -(Dimensions.get('window').height * 0.1),
};

const AnimatedBackground = () => {

  const inicialValue = 0;
  const translateValue = new Animated.Value(inicialValue);

  useEffect(() => {
    const translate = () => {
      translateValue.setValue(inicialValue);
      Animated.timing(translateValue, {
        toValue: ANIMATION_TO_VALUE,
        duration: ANIMATION_DURATION,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => translate());
    };

    translate();
  }, [translateValue]);

  const translateAnimation = translateValue.interpolate({
    inputRange: [INPUT_RANGE_START, INPUT_RANGE_END],
    outputRange: [OUTPUT_RANGE_START, OUTPUT_RANGE_END],
  });

  const AnimatedImage = Animated.createAnimatedComponent(BackgoundImage);

  return (
    <AnimatedImage
      source={require('../../../assets/images/background/hipster-fashion-clothing-doodle-seamless-pattern_1284-6445.jpg')}
      resizeMode="cover"
      style={{
        zIndex: 10,
        transform: [
          {
            translateX: translateAnimation,
          },
          {
            translateY: translateAnimation,
          },
        ],
      }}
      translateIn={translateIn}
    />
  );
};

// Export "AnimatedBackground" component, so other components like "App.js" are able to use this hooks's content.
export default AnimatedBackground;
