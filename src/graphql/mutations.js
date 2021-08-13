// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { gql } from '@apollo/client'

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

export const USER_LOGIN = gql`
  mutation userLogin($usernameData: String!, $passwordData: String!) {
    login(username: $usernameData, password: $passwordData) {
      value
    }
  }
`

export const DELETE_CURRENT_USER = gql`
  mutation deleteCurrentUser($getCurrentID: String!) {
    deleteUser(id: $getCurrentID) {
      response
    }
  }
`
