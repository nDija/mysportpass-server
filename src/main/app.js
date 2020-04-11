import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import mongoose from 'mongoose';
import config from './env.js';
import logger from './log.js';
import expressWinston from 'express-winston';
import winston from "winston";


const app = express();

app.use(morgan('combined', { stream: logger.stream } ));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.json());
/** routes **/
app.use('/', indexRouter);
app.use('/users', usersRouter);
/** end routes **/

logger.info('Environment: ' + process.env.NODE_ENV);

mongoose.Promise = global.Promise;
let dbUrl = 'mongodb://' + config.dburl + ':' + config.dbport + '/' + config.db;
mongoose.connect(dbUrl,{useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        logger.info('Mongodb started on ' + dbUrl);
        app.listen(8000, () => {
            logger.info('Server started on 8000');
        });
    }).catch(() => {
    logger.error('Mongodb connection failed.');
});

logger.debug('This is debug mess');
logger.warn('This is warning mess');
logger.error('This is error mess');

export default app;