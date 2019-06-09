const { MONGO_CONN_STRING } = require('./config/dev');
const { 
  graphqlExpress,
  graphiqlExpress,
} = require('graphql-server-express');
const { makeExecutableSchema } = require ('graphql-tools');
const { MongoClient } = require('mongodb');
const { typeDefs } = require('./schemas/types');
const { resolvers } = require ('./schemas/resolvers');
const bodyParser = require('body-parser');
const env = require('dotenv');
const jwt = require('jsonwebtoken');

const IS_DEV = process.env.NODE_ENV !== 'production';

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

  app.use('/api', bodyParser.json(), graphqlExpress((req) => ({
    schema,
    context: {
      Authorization: req.headers['authorization'],
    },
  })));

  if (IS_DEV) {
    app.use('/apis', graphiqlExpress({ endpointURL: '/api' }));
  }
};

module.exports = {
  init,
}
