const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

// db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {console.log('DB Connected')});

mongoose.connection.on('error', err => {
  console.log(`DB connection error : ${err.message}`)
})

// brign in routes
const postRoutes = require('./routes/post')



//middleware
app.use(morgan("dev"));

app.use('/', postRoutes)


const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`A node js api is listening on port : ${port}`)
});