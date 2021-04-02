const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const db = require('./config/mongoose');
//used for session cookie and authentication
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const router = express.Router();
//they need argument and we passed session as argument
// const MongoStore = require('connect-mongo')(session); //old version of syntax
const MongoStore = require('connect-mongo')(session);
const sassMIddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');
const Noty = require('noty');

//just before server is starting bcz we just need this file preprocessing before server is start
app.use(sassMIddleware({
    src: './assets/scss', //here we get the scss file
    dest: './assets/css', //here we put are all file
    debug: true, //dubug: we want to display error in terminal if there's error while compilation; false when we run on production
    outputStyle: 'extended', //do you want to be everything is single/multiple line = multiple line
    prefix: '/css'
}))



//for cookie
app.use(express.urlencoded());
app.use(cookieParser());

//for static files
app.use(express.static('./assets'));


//Make the uploads path available for the browser
app.use('/uploads', express.static(__dirname + '/uploads'));
//for layout of UI
app.use(expressLayouts); //Always placed before routes middleware

//set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store session cookie in the db
// app.use(session({
//     name: 'codEial', //Name of the cookie
//     //ToDo change the secret before deployment in Production mode
//     secret: 'blahsomething',
//     saveUninitialized: false, //identity not initialized
//     resave: false, //session data (user's info) want to re-write or save it again
//     cookie: {
//         maxAge: (100 * 60 * 100)
//     },
//     store: MongoStore.create(
//         {
//             mongooseConnection: db,
//             autoRemove: 'disabled'
//         },
//         function (err) {
//             console.log(err || 'connect-mongodb ok');
//         }
//     )
// }));

app.use(
    session({
        name: "codeial", //name of cookie
        //todo change the secret before deployment in prod mode
        secret: "blah", //when encryption happens the key to encode and decode
        saveUninitialized: false, //
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 100, //number of minutes  ( in milliseconds)
        },
        store: new MongoStore(
            {
                mongooseConnection: db,
                autoRemove: 'disabled'
                // mongoUrl: "mongodb://localhost/codeial_db", //provide the link of the db
            },
            function (err) {
                //call back fxn if there is an error
                console.log(err || "connect mongodb setup ok");
            }
        ),
    })
);



app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser); //This function is called as Midleware


//Just after passsport & session and above the routes
app.use(flash());
app.use(customMiddleware.setFlash);

//use express router
app.use('/', require('./routes/index'));

// extract style and script from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



app.listen(port, function (err) {
    if (err) {
        console.log(`Error: ${err}`); return; //Interpolation via back tick ``
    }
    console.log("Server is running on Port: ", port);
});