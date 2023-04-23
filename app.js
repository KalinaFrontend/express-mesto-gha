const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const routes = require('./routes');
const CentralError = require('./middlewares/errors/centralError');
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

app.use(requestLogger);

app.use('/', routeSignup);
app.use('/', routeSignin);

app.use(auth);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(CentralError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
