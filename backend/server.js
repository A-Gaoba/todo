const express = require("express");
const env = require('dotenv').config()
const colors = require('colors');
const {errorHandler} = require("./middleWare/errorMiddleWare")
const connectDB  = require('./config/db')
const port = process.env.PORT ||  5000;

connectDB()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/todos", require("./routes/todoRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler)
app.listen(port, () =>
  console.log(`the server is successfully created in ${port}`.bgBlue)
);