const { MONGO_CONN_STRING } = require('./config/dev');
const { 
  ApolloServer,
  makeExecutableSchema,
} = require('apollo-server-express');
const { MongoClient } = require('mongodb');
const { typeDefs } = require('./schemas/types');
const { resolvers } = require ('./schemas/resolvers');
const { RequireAuthDirective } = require('./schemas/directives');

const init = async (app) => {
  const client = await MongoClient.connect(MONGO_CONN_STRING, { 
    useNewUrlParser: true,
  });
  const DB = client.db('grapql-test');
  const User = DB.collection('User');
  const Article = DB.collection('Article');
  const Subscriber = DB.collection('Subscriber');
  const Commenter = DB.collection('Commenter');
  const Comment = DB.collection('Comment');
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers: resolvers(
      User,
      Article,
      Subscriber,
      Commenter,
      Comment,
    ),
    schemaDirectives: {
      requireAuth: RequireAuthDirective,
    }
  });

  const api = new ApolloServer({
    schema,
    context: ({ req }) => ({
      Authorization: req.headers['authorization'],
    }),
  });

  api.applyMiddleware({
    app,
    path: '/api'
  });
};

module.exports = {
  init,
}
