import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import mongoose from 'mongoose';

import config from './environments.js';

const app = express();
let dbUrl;
mongoose.Promise = global.Promise;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);

console.log('Environnement: ' + process.env.NODE_ENV);

if(process.env.NODE_ENV == 'production') {
     dbUrl = 'mongodb://' + config.production.dburl + ':' + config.production.dbport + '/' + config.production.db;
} else {
    dbUrl = 'mongodb://' + config.development.dburl + ':' + config.development.dbport + '/' + config.development.db;
}

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
      console.log('mongodb started.');
      app.listen(8000, () => {
        console.log('Server started on 8000');
      });
    }).catch(() => {
  console.log('Mongodb connection failed.');
})


export default app;
