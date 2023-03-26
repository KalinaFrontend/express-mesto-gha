const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64209bc0f1de8ccfc7f98521',
  };
  next();
});

app.use('/users', routerUsers);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
