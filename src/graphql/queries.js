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
// Define "SHOW_ALL_PRODUCTS" query, which is being used in the "Dashboard" component.
// So everytime user has logged successfully to the app, user will be redirected to
// "Dashboard" (home) and app will show every product which has been added by the
// different users back to the logged user.
export const SHOW_ALL_PRODUCTS = gql`
  query {
    showAllProducts {
      _id
      productTitle
      productDescription
      productSize
      productPrice
      productGroupName
      owner {
        name
        rating
      }
    }
  }
`
