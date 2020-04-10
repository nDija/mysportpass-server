import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
//import logger from 'morgan';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import mongoose from 'mongoose';
import config from './env.js';
import logger from './log.js';
import expressWinston from 'express-winston';
import winston from "winston";


const app = express();

let consoleT = new winston.transports.Console({
    colorize: true,
    level: 'debug',
    format: winston.format.combine(
        winston.format.simple(),
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}` + (info.splat !== undefined ? `${info.splat}` : " ")),
        winston.format.colorize({all: true})
    )});

app.use(expressWinston.logger({
    transports: [consoleT],
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}));

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