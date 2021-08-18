// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { gql } from '@apollo/client' // Define "gql" function from "@apollo/client" library's content for this file usage.

// Define "CREATE_NEW_USER" mutation, so user is able to create new user to the database.
export const CREATE_NEW_USER = gql`
  mutation createNewUser($nameData: String!, $usernameData: String!, $passwordData: String!, $emailData: String!) {
    createUser(name: $nameData, username: $usernameData, password: $passwordData, email: $emailData) {
      id
      name
      username
      email
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

// Define "DELETE_CURRENT_USER" mutation, so user is able delete his/her account for the database.
export const DELETE_CURRENT_USER = gql`
  mutation deleteCurrentUser($getCurrentID: String!) {
    deleteUser(id: $getCurrentID) {
      response
    }
  }
`
