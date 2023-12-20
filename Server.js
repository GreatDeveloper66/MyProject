require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch(err => {
        console.error(err);
    })

    app.use(express.json()); // middleware to parse incoming requests with JSON payloads
    const subscribersRouter = require('./routes/subscribers');
    app.use('/subscribers', subscribersRouter);


    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    })  // 3000 is the port number
