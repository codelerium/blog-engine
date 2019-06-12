const { MONGO_CONN_STRING } = require('./config/dev');
const { 
  ApolloServer,
  makeExecutableSchema,
} = require('apollo-server-express');
const { MongoClient } = require('mongodb');
const { typeDefs } = require('./schemas/types');
const { resolvers } = require ('./schemas/resolvers');
const env = require('dotenv');
const jwt = require('jsonwebtoken');

const directiveResolvers = {
  requireAuth(next, src, args, context) {
    let token;
    try {
      token = context.Authorization.split(' ')[1];
      const config = env.config();
      const valid = jwt.verify(token, config.parsed.SECRET);
      if (valid) {
        return next();
      }
      return 'Unauthorized';
    } catch(err) {
      throw new Error(err);
    }
  }
}

const init = async (app) => {
  const client = await MongoClient.connect(MONGO_CONN_STRING);
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
    directiveResolvers,
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
