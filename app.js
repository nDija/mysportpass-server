import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import mongoose from 'mongoose';

import _envFile from './environments.json';

console.log(_envFile);
const app = express();

mongoose.Promise = global.Promise;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const _env = eval('_envFile.' + process.env.NODE_ENV);
const url = 'mongodb://' + _env.dburl + ':' + _env.dbport + '/' + _env.db;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
      console.log('mongodb started.');
      app.listen(8000, () => {
        console.log('Server started on 8000');
      });
    }).catch(() => {
  console.log('Mongodb connection failed.');
})


export default app;
