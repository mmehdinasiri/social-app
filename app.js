const express = require('express');
const app = express();
const mongoose = require('mongoose'); // MongoDB object modeling designed to work in an asynchronous environment.
const morgan = require('morgan'); //HTTP request logger middleware for node.js
const bodyParser = require('body-parser'); //Node.js body parsing middleware.
const expressValidator = require('express-validator');
const dotenv = require('dotenv'); //Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
dotenv.config();

// dbkkk
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {console.log('DB Connected')});

mongoose.connection.on('error', err => {
  console.log(`DB connection error : ${err.message}`)
})

// brign in routes
const postRoutes = require('./routes/post')



//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(expressValidator());

app.use('/', postRoutes)


const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`A node js api is listening on port : ${port}`)
});