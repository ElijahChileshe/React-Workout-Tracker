require('dotenv').config()

const express = require('express');
const workoutroutes = require("./routes/workouts")
const mongoose = require("mongoose")

// express app
const app = express()

//express middleware
app.use(express.json())

//route middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

app.use("/", workoutroutes)

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        //listen for requests
        app.listen(process.env.PORT, () =>{
            console.log('Connected to DB and Listening on port', process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })

