const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.static(path.join((__dirname, 'public'))));

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(PORT, () => {
  console.log('hello))))');
});
