const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routes = require('./routes');
const CentralError = require('./errors/CentralError');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(routes);

app.use(errors());
app.use(CentralError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
