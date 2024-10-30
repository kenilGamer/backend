const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const port = process.env.PORT || 3000;
const jwt = require('jsonwebtoken');
const cors = require('cors');
const indexRouter = require('./src/routes/routeindex');
const postRouter = require('./src/routes/postroute');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// Corrected the path to views directory
app.set('views', path.join(__dirname, './src/views'));
// app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', indexRouter);
app.use('/post', postRouter);
//app.use('/chat', chatRouter);
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});