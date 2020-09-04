import pino from 'pino';

const logger = pino({ level: process.env.LOG_LEVEL, 
  prettyPrint: true,
});

export default logger;