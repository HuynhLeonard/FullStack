import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import {errorResponseHandler,invalidPathHandler} from "./middleware/errorHandler.js";

dotenv.config();
const app = express();
connectDB();
app.use(express.json());
app.use("/api/users", userRoutes);

app.use(errorResponseHandler);
app.use(invalidPathHandler);
const PORT = process.env.PORT || 8000

app.listen(8000, () => {
    console.log(`App is listening on Port ${PORT}`);
})