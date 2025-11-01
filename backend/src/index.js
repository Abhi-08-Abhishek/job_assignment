import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import connectDB from './config/db.js';
import transactionsRoutes from './routes/transaction.route.js';
import errorHandler from './middleware/errorHandler.js';
import logger from './utils/logger.js';


const app = express();


// middleware
app.use(helmet());
app.use(cors());
app.use(express.json());


// log on console of every requests
app.use((req,res,next) =>{
    logger.info(`Received ${req.method} request to ${req.url}`);
    logger.info(`Request body, ${req.body}`);
    next();
})


app.use('/api/transactions', transactionsRoutes);

// Routes
app.get('/', (req, res) => res.send('Expense Tracker API'));


// error handlers
app.use(errorHandler);

const PORT = process.env.PORT


connectDB()
.then(() => app.listen(PORT, () => logger.info(`Server is running on ${PORT}`)))
.catch((err) => { logger.error('DB connection failed', err)});


//unhandled promise rejection
process.on('unhandledRejection', (reason, promise) => {
    logger.error('unhandled Rejection at', promise, 'reason',reason)
});