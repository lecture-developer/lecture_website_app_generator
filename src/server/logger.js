import pino from 'pino';

// Logger configuration
const logger = pino({ level: process.env.LOG_LEVEL, 
  prettyPrint: true,
});

export default logger;