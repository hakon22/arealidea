const express = require('express');
const path = require('path');
const cors = require('cors');
const api = require('./api.js');

const app = express();
const port = process.env.PORT || 3000;


const buildPath = path.join(__dirname, 'frontend', 'build');

app.use(express.static(buildPath));
app.use(express.json());
app.use(cors());

app.use(api);

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is online on port: ${port}`);
});