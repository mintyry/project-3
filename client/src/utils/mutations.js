import { gql } from '@apollo/client';

// creates a user, returns token and relevant user info (eg: leave out keptBooks because when creating a new user, they will not have keptBooks, so we don't need to show field we know will be empty)
export const CREATE_USER = gql`
mutation CreateUser($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      role
    }
  }
}
`;

// logs user in and returns _id, username, and email
export const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
      email
    }
  }
}
`;

// reviews and comment mutation
export const ADD_REVIEW = gql`
mutation addReview($bookId: ID!, $rating: Int!, $content: String) {
  addReview(bookId: $bookId, rating: $rating, content: $content) {
    _id
    title
    bookId
    text
    authors {
      _id
      name
    }
    image {
      data
      contentType
    }
    reviews {
      _id
      rating
      content
      createdAt
      userId {
        _id
        username
        email
        role
        keptBooks {
          _id
          title
          bookId
          text
        }
      }
    }
  }
}
`;

export const ADD_COMMENT = gql`
mutation addComment($reviewId: ID!, $content: String) {
  addComment(reviewId: $reviewId, content: $content) {
    _id
    comments {
      content
      userId
      _id
    }
  }
}
`

export const KEEP_BOOK = gql`
mutation KeepBook($input: KeepBookInput!) {
  keepBook(input: $input) {
    _id
    keptBooks {
      authors {
        name
      }
      bookId
      image {
        data
      }
      title
      _id
    }
  }
}
`