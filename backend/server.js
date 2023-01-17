const express = require("express");
const env = require('dotenv').config()
const colors = require('colors');
const {errorHandler} = require("./middleWare/errorMiddleWare")

const port = process.env.PORT ||  5000;
const app = express();

const connectDB  = require('./config/db')
connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/todos", require("./routes/todoRoutes"));

app.use(errorHandler)
app.listen(port, () =>
  console.log(`the server is successfully created in ${port}`.bgBlue)
);