// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
type Query {
  me: User
  users: [User]
}  

type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    Book(_id: ID!): Book
    authors:[]
    description: String
    title: String
    image:
    link


  }

  type Auth {
    token: ID!
    user: Usern
  }
  

  type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  saveBook(bookText: String!): User
  removeBook(bookId: ID):User
  }
`;

// export the typeDefs
module.exports = typeDefs;

// for saveBooks: 🚫Look into creating what's known as an input type to handle all of these parameters!)

