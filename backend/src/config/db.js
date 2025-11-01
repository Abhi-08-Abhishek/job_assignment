import mongoose from 'mongoose';
import logger from '../utils/logger.js';

const connectDB = async () => {
    try{

    await mongoose.connect(process.env.MONGO_URI);
    logger.warn('Database Connected...');
    }
    catch(err){
        logger.error('Data base not connected',err);
    }
}

export default  connectDB;