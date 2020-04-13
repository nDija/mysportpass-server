import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import mongoose from 'mongoose';
import logger from './log.js';
import indexRouter from './routes/index';
import usersRouter from './routes/user';
import organizationsRouter from './routes/organization';
import config from './env.js';

const app = express();

app.use(morgan('tiny', { stream: logger.stream } ));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.json());
/** routes **/
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/organizations/', organizationsRouter);
/** end routes **/

logger.info('Environment: ' + process.env.NODE_ENV);

mongoose.Promise = global.Promise;
let dbUrl = 'mongodb://' + config.dburl + ':' + config.dbport + '/' + config.db;
mongoose.connect(dbUrl,{useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => {
        logger.info('Mongodb started on ' + dbUrl);
        app.listen(8000, () => {
            logger.info('Server started on 8000');
        });
    }).catch(() => {
    logger.error('Mongodb connection failed.');
});

export default app;