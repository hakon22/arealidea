const express = require('express');
const path = require('path');
const api = require('./api.js');

const app = express();
const indexHTML = path.resolve(__dirname, '../public/index.html');

app.use('/api', api);
app.get('/*', (request, response) => {
  response.sendFile(indexHTML);
});

app.listen(3001);
