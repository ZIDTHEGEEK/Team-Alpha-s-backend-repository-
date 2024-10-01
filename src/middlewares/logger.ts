import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';

const loggerInstance = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        utilities.format.nestLike('sui-dems-app', {
          colors: true,
          prettyPrint: true,
        }),
      ),
    }),
  ],
});

export default loggerInstance;
