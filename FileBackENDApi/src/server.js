const  {Console}  = require('console');
const express = require('express');
require('dotenv').config();
console.log(">>>>check env", process.env);
const configViewEngine = require('./config/newengine');
const webRouter = require('./routes/web');
const initAPIRoute = require('./routes/api');
const connection = require('./config/database');
const path = require('path');
const app = express();
const port = process.env.PORT || 8888;// hardcode
const hostname = 'localhost';
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 
configViewEngine(app);
app.use('', webRouter);
initAPIRoute(app);
app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})



