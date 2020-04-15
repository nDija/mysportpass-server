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
import subscriptionsRouter from './routes/SubscriptionRoute';
import coursesRouter from './routes/CourseRoute';
import config from './env';

const app = express();

app.use(morgan('tiny', { stream: logger.stream } ));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));

/** routes **/
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/organizations/', organizationsRouter);
app.use('/coaches/', coachesRouter);
app.use('/subscriptions/', subscriptionsRouter);
app.use('/courses/', coursesRouter);
/** end routes **/

logger.info('Environment: ' + process.env.NODE_ENV);

mongoose.Promise = global.Promise;
let dbUrl = 'mongodb://' + config.dbUrl + ':' + config.dbPort + '/' + config.db;
mongoose.connect(
    dbUrl,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => {
        logger.info('Mongodb started on ' + dbUrl);
        app.listen(config.port, () => {
            logger.info('Server started on ' + config.port);
        });
    })
    .catch(() => {
        logger.error('Mongodb connection failed.');
    });

export default app;