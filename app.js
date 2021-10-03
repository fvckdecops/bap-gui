const express    = require('express');
const session    = require('express-session');
const path       = require('path');
const http      = require('http');
const https      = require('https');
const fs         = require('fs');
const bodyParser = require('body-parser');
const BASE_DIR   = path.dirname(require.main.filename);
const appRouter  = require(BASE_DIR + '/routes');
const app        = express();
require('dotenv').config()

app.set('views', BASE_DIR + '/views');
app.set('view engine', 'ejs');

app.use(session({
    secret: process.env.SECRET_TOKEN,
    saveUninitialized: true,
    resave: false
}));

app.use(bodyParser.json({
    extended: true,
    limit: '50mb'
}));

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/assets", express.static(__dirname + '/assets'));
app.use('/', appRouter);

var serverHttp = http.createServer({}, app);

var serverHttps = https.createServer({
    key: fs.readFileSync(path.resolve(BASE_DIR, './') + '/ssl/privkey.pem'),
    cert: fs.readFileSync(path.resolve(BASE_DIR, './') + '/ssl/cert.pem'),
}, app);

serverHttp.listen(process.env.APP_PORT, function() {
    console.log(process.env.APP_NAME + " listening at port " + process.env.APP_PORT);
});

serverHttps.listen(process.env.APP_PORT_SSL, function() {
    console.log(process.env.APP_NAME + " listening at port " + process.env.APP_PORT_SSL);
});