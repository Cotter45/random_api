const appRoot = require('path').resolve('logs');
const winston = require('winston');
require('winston-daily-rotate-file');

// define the custom settings for each transport (file, console)
const options = {
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const errorFilter = winston.format((info, opts) => {
  return info.level === 'error' ? info : false;
});

const infoFilter = winston.format((info, opts) => {
  return info.level === 'info' ? info : false;
});


// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
  // level: 'verbose',
  format: winston.format.combine(
    winston.format.printf((info) => {
      return `${info.level} ${info.message}`
    }),
    winston.format.json(),
    winston.format.timestamp()
  ),
  transports: [
    new winston.transports.DailyRotateFile({
      level: 'error',
      filename: `${appRoot}/errors-%DATE%.log`,
      handleExceptions: true,
      colorize: true,
      maxSize: '20m',
      maxFiles: '14d',
      format: winston.format.combine(
        errorFilter(),
        winston.format.timestamp(),
        winston.format.printf(info => `{"timeStamp": "${info.timestamp}" , "level": "${info.level}", "message": "${info.message}"},`)
      )
    }),
    new winston.transports.DailyRotateFile({
      level: 'info',
      format: winston.format.combine(
        infoFilter(),
        winston.format.timestamp(),
        winston.format.printf(info => `{"timeStamp": "${info.timestamp}" , "level": "${info.level}", "message": "${info.message}"},`)
      ),
      filename: `${appRoot}/info-%DATE%.log`,
      handleExceptions: true,
      maxSize: '20m',
      maxFiles: '14d',
      colorize: true,
    })
  ],
  exitOnError: false, // do not exit on handled exceptions
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new (winston.transports.Console)(options.console));
}

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {

      // use the 'info' log level so the output will be picked up by both transports (file and console)
      logger.info(message.trim());
    
  },
};

module.exports = logger;
