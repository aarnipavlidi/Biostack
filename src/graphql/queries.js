// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { gql } from '@apollo/client' // Define "gql" function from "@apollo/client" library's content for this file usage.

// Define "CURRENT_LOGGED_USER" query and when user is logged in successfully to
// the app, we are able to tell that which "user" is currently logged in.
export const CURRENT_LOGGED_USER = gql`
  query {
    me {
      _id
      name
      username
      email
      rating
      products {
        _id
        productTitle
        productDescription
        productSize
        productPrice
        productGroupName
      }
    }
  }
`
