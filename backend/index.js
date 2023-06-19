const express = require('express');
const api = require('./api.js');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});
app.use(api);
app.get('/', (req, res) => {
  res.status(200).send({ some: 'json' });
});

app.listen(3001);
