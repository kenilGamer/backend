const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const port = process.env.PORT || 3000;
const cors = require('cors');
const indexRouter = require('./src/routes/routeindex');
const postRouter = require('./src/routes/postroute');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET, // replace with your secret
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 14 * 24 * 60 * 60, // 14 days
  }),
  cookie: { 
      secure: false, // set to true if using HTTPS
      maxAge: 1000 * 60 * 60 // 1 hour expiration time
  }
}));
// console.log(session.);
// Set views directory and view engine
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs'); // Add this line to specify the view engine
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', indexRouter);
app.use('/post', postRouter);
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
