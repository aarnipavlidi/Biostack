// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import styled from 'styled-components/native'; // Import "styled" from "styled-components/native" library's content for this component usage.

export const BackgoundImage = styled.ImageBackground.attrs(props => ({
  imageStyle: {
    width: '400%',
    height: '400%',
    transform: [
      {
        translateX: props.translateIn.inX,
      },
      {
        translateY: props.translateIn.inY,
      },
      {
        rotate: '-0deg',
      },
    ],
  },
}))`
  position: absolute;
  flex: 1;
  width: 100%;
  height: 100%;
  opacity: 0.1;
`;
