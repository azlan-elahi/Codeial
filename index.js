const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const port = 8000;

const router = express.Router();

//for cookie
app.use(express.urlencoded());
app.use(cookieParser());

//for layout of UI
app.use(expressLayouts); //Always placed before routes middleware
app.use('/', require('./routes/index'));
//for static files
app.use(express.static('./assets'));

app.set('view engine', 'ejs');
app.set('views', './views');

// extract style and script from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




app.listen(port, function (err) {
    if (err) {
        console.log(`Error: ${err}`); return; //Interpolation via back tick ``
    }
    console.log("Server is running on Port: ", port);
});