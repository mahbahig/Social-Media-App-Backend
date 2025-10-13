import chalk from 'chalk';
import mongoose from 'mongoose';
import { devConfig } from '../config/dev.config';

export const connectDB = () => {
    mongoose.connect(devConfig.MONGO_URI as string).then(() => {
        console.log(chalk.bold.green('Connected to Database successfully'));
    }).catch((err) => {
        console.log(chalk.bold.red('Error connecting to Database'));
        console.log(chalk.red(err.message));
    });
};