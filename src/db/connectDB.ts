import chalk from 'chalk';
import mongoose from 'mongoose';

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI as string).then(() => {
        console.log(chalk.bold.green('Connected to Database successfully'));
    }).catch((err) => {
        console.log(chalk.bold.red('Error connecting to Database'));
        console.log(chalk.red(err.message));
    });
};

export default connectDB;