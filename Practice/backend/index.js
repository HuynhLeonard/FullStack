import express from "express"
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose";
import bookRoute from "../backend/routes/book.js";
import cors from "cors"

const app = express();

app.listen(PORT,() => {
    console.log(`App is listening to port ${PORT}`);
});

app.use(express.json());
// app.use(cors({
//         origin: "http://localhost:3000",
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type']
//     })
// );
app.use(cors());

app.use("/books", bookRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('Connected to Database');
    })
    .catch((err) => {
        console.log(err);
    })