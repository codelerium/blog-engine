import { MONGO_CONN_STRING } from './config/dev';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { MongoClient } from 'mongodb';
import { typeDefs } from './schemas/types';
import { resolvers } from './schemas/resolvers' ;
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'babel-polyfill';

const init = async () => {
  const client = await MongoClient.connect(MONGO_CONN_STRING);
  const DB = client.db('grapql-test');
  const User = DB.collection('User');
  const Article = DB.collection('Article');

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers: resolvers(User, Article),
  });

  const app = express();

  app.use(cors());
  app.use('/api', bodyParser.json(), graphqlExpress({schema}));
  app.use('/apis', graphiqlExpress({ endpointURL: '/api' }));
  app.listen(3001, () => { console.log('Server started at http://localhost:3001'); })
};

init();
