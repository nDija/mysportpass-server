import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import mongoose from 'mongoose';
import logger from './log';
import indexRouter from './routes/IndexRoute';
import usersRouter from './routes/UserRoute';
import organizationsRouter from './routes/OrganizationRoute';
import coachesRouter from './routes/CoachRoute';
import config from './env';

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
app.use('/coaches/', coachesRouter);
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