import winston from "winston";
import config from "./env";

const logger = winston.createLogger({
    level: config.logLevel,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.simple()
    ),
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({ filename: config.logPath + 'error.log', level: 'error' }),
        new winston.transports.File({ filename: config.logPath + 'combined.log' }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.simple(),
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}` + (info.splat !== undefined ? `${info.splat}` : " ")),
                winston.format.colorize({all: true})
            )
        })
    ]
});

logger.stream = {
    write: (msg) => {
        let code = parseInt(msg.split(' ')[2]); // depend on morgan format...
        if(code >= 400)
            logger.error(msg);
        else
            logger.debug(msg);
    }
}

winston.addColors({
    error: 'red',
    warn: 'yellow',
    info: 'white',
    debug: 'green'
});

export default logger;