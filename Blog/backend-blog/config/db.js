import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected to Database');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

export default connectDB;