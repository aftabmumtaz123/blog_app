require('dotenv').config();
const connectDB = require('./server/config/db')


const express = require('express');
const expressLayout = require('express-ejs-layouts')
const cookieParser = require('cookie-parser');
const mongoStore = require('connect-mongo');
const methodOverride = require('method-override')
const session = require('express-session');
const app = express();
const {isActiveRoute} = require('./server/helpers/routeHelper')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'))

app.locals.isActiveRoute = isActiveRoute;


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    })
}))

connectDB();


app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;

app.use('/',require('./server/routes/main'));
app.use('/',require('./server/routes/admin'));









app.listen(port,()=>{
    console.log(`App is running on port:${port}`);
})