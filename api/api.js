import { MONGO_CONN_STRING } from './config/dev';
import { 
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { MongoClient } from 'mongodb';
import { typeDefs } from './schemas/types';
import { resolvers } from './schemas/resolvers' ;
import express from 'express';
import bodyParser from 'body-parser';
import env from 'dotenv';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import fs from 'fs';
import https from 'https';
import 'babel-polyfill';

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/codelirium.io/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/codelirium.io/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/codelirium.io/chain.pem', 'utf8');

const credentials = {
	// key: privateKey,
	// cert: certificate,
	// ca: ca
};

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

const init = async () => {
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

  const app = express();

  app.use(express.static(__dirname, { dotfiles: 'allow' } ));
  app.use(cors());
  app.use('/api', bodyParser.json(), graphqlExpress((req) => ({
    schema,
    context: {
      Authorization: req.headers['authorization'],
    },
  })));

  const httpsServer = https.createServer(credentials, app);

  // httpsServer.listen(444, () => {
  //   console.log('HTTPS Server running on port 444');
  // });
  app.use('/apis', graphiqlExpress({ endpointURL: '/api' }));
  app.listen(3001, () => { 
    console.log('Server started at http://localhost:3001'); 
  });
};

init();
