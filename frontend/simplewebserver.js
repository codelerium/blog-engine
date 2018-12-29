const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('tiny'));
app.use(express.static('public'));

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(80, () => console.log('App listening on port 80!'));