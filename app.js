const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const routes = require('./routes');
const CentralError = require('./middlewares/errors/centralError');
const NotFoundError = require('./middlewares/errors/notFoundError');
const routeSignup = require('./routes/signup');
const routeSignin = require('./routes/signin');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/', routeSignup);
app.use('/', routeSignin);

app.use(auth);

app.use(routes);

app.use('*', () => {
  throw new NotFoundError('Объект не найден');
});

app.use(errors());
app.use(CentralError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
