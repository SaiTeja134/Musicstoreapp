import express, { request } from 'express';
import mongoose from 'mongoose';
import songsRoute from './routes/songsRoute.js';
import multer from 'multer';
import cors from 'cors';

const app = express();

// adding a middleware for parsing our request body
app.use(express.json());

// Middleware for handling CORS POLICY
app.use(cors());

app.get( '/', (req, res) => {
    console.request(request);
    return request.status(234).send('Welcome to Music Store');
})

// middleware for using routes
app.use('/songs', songsRoute);

mongoose.connect('mongodb+srv://admin:admin@mernapp.2utgh4u.mongodb.net/songs-collection?retryWrites=true&w=majority')
    .then(() => {
        console.log("Connected to database");
        app.listen(4000, () => {
            console.log("Server started listening on port 4000");
        })        
    })
    .catch((error) => {
        console.log(error);
    })
