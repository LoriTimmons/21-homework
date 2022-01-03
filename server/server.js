const express = require('express');
// import ApolloServer
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const routes = require('./routes');

// import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./Schemas');
const db = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const startServer = async () => {

  // Apollo server and schema data
  const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    context: authMiddleware 
  });

// Apollo server
await server.start();

// Apollo  middleware
server.applyMiddleware({ app });

// log where we can go to test our GQL API
console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

// Start Apollo server
startServer();

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
