const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const startCron = require('./controllers/indexController');
const indexRouter = require('./routes/index');

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/** enable cors */
app.use(cors({
  preflightContinue: true,
  allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'x-access-token', 'Content-Type', 'Accept', 'Authorization', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Origin'],
}));
app.options('*', cors());

/** mongo connections */
mongoose.Promise = global.Promise;
let db = mongoose.connection;
const mongoDbUri = process.env.MONGODB_URI;
mongoose.connect(mongoDbUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).
  then(() => console.log('Connected')).
  catch(err => console.log('Caught', err));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/** configure cron */
setTimeout(() => {
  startCron.startCronjob();
}, 500)

/** Routes enables */
app.use('/', indexRouter);

/** catch 404 and forward to error handler */
app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app; 
