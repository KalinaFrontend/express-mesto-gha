const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64209bc0f1de8ccfc7f98521',
  };
  next();
});
app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
