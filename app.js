const express = require('express');
const path = require('path');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.static(path.join((__dirname, 'public'))));
app.use(bodyParse.json());
app.use(routes);

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(PORT, () => {
  console.log('hello))))');
});
