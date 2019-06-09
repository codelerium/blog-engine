const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const express = require('express');
const morgan = require('morgan');
const api = require('./api');

const IS_DEV = process.env.NODE_ENV !== 'production';

const PORTS = {
  DEV: 3000,
  PROD: {
    HTTP: 80,
    HTTPS: 443,
  }
}

const app = express();

app.use(morgan('tiny'));
app.use(express.static(path.resolve(__dirname, 'frontend/public')));
app.use(express.static(__dirname, { dotfiles: 'allow' } ));

app.get('*', function(_, res) {
  res.sendFile(__dirname + '/frontend/public/index.html');
});

api.init(app);

if (IS_DEV) {
  app.listen(PORTS.DEV, () => console.log(`DevServer running on port ${PORTS.DEV}`))
} else {
  const privateKey = fs.readFileSync('/etc/letsencrypt/live/codelirium.io/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('/etc/letsencrypt/live/codelirium.io/cert.pem', 'utf8');
  const ca = fs.readFileSync('/etc/letsencrypt/live/codelirium.io/chain.pem', 'utf8');

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
  };

  http.createServer((req, res) => {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
  }).listen(PORTS.PROD.HTTP);

  https
    .createServer(credentials, app)
    .listen(PORTS.PROD.HTTPS, () => console.log(`Server running on port ${PORTS.PROD.HTTPS}`));
}
