import winston from 'winston';

// using for logs or console output
const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info': 'debug',
    format: winston.format.combine(
        winston.format.timestamp(),    // with time
        winston.format.errors({stack: true}), // stack data
        winston.format.splat(),   //message templeting
        winston.format.json()   // in json format
    ),

    defaultMeta : {service: 'Expense Tracker'},
    transports:[
    new winston.transports.Console({   //log is appear in terminal 
    format: winston.format.combine(
        winston.format.colorize(),   // colorize 
        winston.format.simple()    // in simple format
    ),
}),
new winston.transports.File({filename: 'error.log', level: 'error'}),  // error.log file create when error happen
new winston.transports.File({filename: 'combined.log'}),   // combine.log file create when success happen
],
})

export default logger;