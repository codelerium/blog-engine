const Client = require('node-ssh');
const localEnv = require('dotenv').config();
const path = require('path');
const client = new Client();
const env = localEnv.parsed;

const deployClient = () => {
  return client.putFile(
    path.resolve(__dirname, '../public/app.bundle.js'),
    '/home/jungd/codelirium/public/app.bundle.js'
  ).then((status) => {
    console.log('[CLIENT] transferred:', status === undefined);
  }).catch(err => console.log(err));
}

const deployServer = () => {
  return client.putFile(
    path.resolve(__dirname, '../server.bundle.js'),
    '/home/jungd/codelirium/server.bundle.js'
  ).then((status) => {
    console.log('[SERVER] transferred:', status === undefined);
  }).catch(err => console.log(err));
}

client.connect({
  host: process.env.FTP_HOST || env.FTP_HOST,
  port: process.env.FTP_PORT || env.FTP_PORT,
  username: process.env.FTP_USER_NAME || env.FTP_USER_NAME,
  password: process.env.FTP_PASS || env.FTP_PASS,
}).then(async () => {
  await Promise.all([
    deployClient(),
    deployServer(),
  ]);
  client.dispose();
});