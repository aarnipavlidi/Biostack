// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { gql } from '@apollo/client' // Define "gql" function from "@apollo/client" library's content for this file usage.

// Define "CREATE_NEW_USER" mutation, so user is able to create new user to the database.
export const CREATE_NEW_USER = gql`
  mutation createNewUser($nameData: String!, $usernameData: String!, $passwordData: String!, $emailData: String!) {
    createUser(name: $nameData, username: $usernameData, password: $passwordData, email: $emailData) {
      _id
      name
      username
      email
      rating
    }
  }
`

export const UPDATE_USER = gql`
  mutation updateUserValue($getNameValue: String, $getEmailValue: String) {
    updateUser(newUserNameValue: $getNameValue, newUserEmailValue: $getEmailValue) {
      response
    }
  }
`

// Define "USER_LOGIN" mutation, so user is able to log in to the app with the credentials user previously made.
export const USER_LOGIN = gql`
  mutation getUserCredentials($usernameData: String!, $passwordData: String!) {
    login(username: $usernameData, password: $passwordData) {
      value
    }
  }
`

export const USER_LOGIN_FACEBOOK = gql`
  mutation getUserCredentials(
    $facebookID: String!,
    $facebookAvatar: String!,
    $facebookEmail: String!,
    $facebookName: String!,
    $facebookUsername: String!,
    $facebookCity: String!,
    $facebookRegionID: Int!,
    $facebookLatitude: Float!,
    $facebookLongitude: Float!
  ) {
    facebookLogin(
      getFacebookID: $facebookID,
      getFacebookAvatar: $facebookAvatar,
      getFacebookEmail: $facebookEmail,
      getFacebookName: $facebookName,
      getFacebookUsername: $facebookUsername,
      getFacebookCity: $facebookCity,
      getFacebookRegionID: $facebookRegionID,
      getFacebookLatitude: $facebookLatitude,
      getFacebookLongitude: $facebookLongitude
    ) {
      value
    }
  }
`

// Define "CREATE_NEW_PRODUCT" mutation, so user is able to add new item to the database.
export const CREATE_NEW_PRODUCT = gql`
  mutation createNewProduct($productTitle: String!, $productDescription: String!, $productSize: String!, $productPrice: String!, $productType: String!, $productImageValue: Int!, $owner: String!) {
    createProduct(
      productTitle: $productTitle,
      productDescription: $productDescription,
      productSize: $productSize,
      productPrice: $productPrice,
      productType: $productType,
      productImageValue: $productImageValue,
      owner: $owner
    ) {
      _id
      productTitle
      productDescription
      productSize
      productPrice
      productImage {
        name
        value
      }
    }
  }
`

// Define "CREATE_NEW_TRANSACTION" mutation, so once user is going to buy specific item
// from the app, then this mutation will add new transaction for both seller and buyer
// and save the values to the database.
export const CREATE_NEW_TRANSACTION = gql`
  mutation createNewTransaction(
    $date: String!,
    $productID: String!,
    $productTitle: String!,
    $productSize: String!,
    $productPrice: String!,
    $productType: String!,
    $productImage: Int!,
    $sellerID: String!,
    $sellerName: String!,
    $sellerEmail: String!,
    $sellerCity: String!
    $sellerRegionID: Int!,
    $sellerLatitude: String!,
    $sellerLongitude: String!,
    $shippingMethod: String!,
    $paymentMethod: String!,
    $paymentTotal: String!
  ) {
    createTransaction(
      date: $date,
      productID: $productID,
      productTitle: $productTitle,
      productSize: $productSize,
      productPrice: $productPrice,
      productType: $productType,
      productImage: $productImage,
      sellerID: $sellerID,
      sellerName: $sellerName,
      sellerEmail: $sellerEmail,
      sellerCity: $sellerCity,
      sellerRegionID: $sellerRegionID,
      sellerLatitude: $sellerLatitude,
      sellerLongitude: $sellerLongitude,
      shippingMethod: $shippingMethod,
      paymentMethod: $paymentMethod,
      paymentTotal: $paymentTotal
    ) {
      _id
      date
      type
      productID
      productTitle
      productSize
      productPrice
      productType
      productImage
      sellerID
      sellerName
      sellerEmail
      shippingMethod
      paymentMethod
      paymentTotal
    }
  }
`

export const GIVE_RATING_USER = gql`
  mutation giveRatingCurrentUser($getCurrentTransactionID: String!, $getRatingValue: Int!, $getTransactionType: String!) {
    giveRatingUser(currentTransactionID: $getCurrentTransactionID, getRatingValue: $getRatingValue, getTransactionType: $getTransactionType) {
      response
    }
  }
`

// Define "DELETE_CURRENT_PRODUCT" mutation, so user is able to delete his listed items
// from the database, so they won't be visible to other users after deletion.
export const DELETE_CURRENT_PRODUCT = gql`
  mutation deleteCurrentProduct($getCurrentID: String!) {
    deleteProduct(currentProductID: $getCurrentID) {
      response
    }
  }
`

export const DELETE_ALL_PRODUCTS = gql`
  mutation deleteAllProducts {
    deleteManyProduct {
      response
    }
  }
`

// Define "DELETE_CURRENT_USER" mutation, so user is able delete his/her account for the database.
export const DELETE_CURRENT_USER = gql`
  mutation deleteCurrentUser($getCurrentID: String!) {
    deleteUser(id: $getCurrentID) {
      response
    }
  }
`
