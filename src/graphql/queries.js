// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { gql } from '@apollo/client'

export const CURRENT_LOGGED_USER = gql`
  query {
    me {
      id
      name
      username
      email
    }
  }
`
