const express = require('express');
const app = express();
const morgan = require('morgan');

// brign in routes
const postRoutes = require('./routes/post')



//middleware
app.use(morgan("dev"));

app.use('/', postRoutes)


const port = 8080;
app.listen(port, () => {
  console.log(`A node js api is listening on port : ${port}`)
});