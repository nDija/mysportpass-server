import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import mongoose from 'mongoose';
import config from './environments.js';
import winston from 'winston';
import expressWinston from 'express-winston';

const app = express();
let dbUrl;

const loggerW = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    //defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

if (process.env.NODE_ENV !== 'production') {

}

if(process.env.NODE_ENV ==='production') {
    app.use(logger('info'));
    dbUrl = 'mongodb://' + config.production.dburl + ':' + config.production.dbport + '/' + config.production.db;
} else {
    loggerW.add(new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
            winston.format.simple(),
            winston.format.colorize({ all: true }),
        )
    }));
    app.use(logger('dev'));
    dbUrl = 'mongodb://' + config.development.dburl + ':' + config.development.dbport + '/' + config.development.db;
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.json());
/** routes **/
app.use('/', indexRouter);
app.use('/users', usersRouter);
/** end routes **/

loggerW.info('Environment: ' + process.env.NODE_ENV);

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        loggerW.info('Mongodb started on ' + dbUrl);
        app.listen(8000, () => {
            loggerW.info('Server started on 8000');
        });
    }).catch(() => {
    loggerW.error('Mongodb connection failed.');
});

export default app;