const express = require('express');
const app = express();
const port = 8000;

const router = express.Router();

app.use('/', require('./routes/index'));


app.listen(port, function (err) {
    if (err) {
        console.log(`Error: ${err}`); return; //Interpolation via back tick ``
    }
    console.log("Server is running on Port: ", port);
});