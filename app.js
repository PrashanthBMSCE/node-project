

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();
var routes = require('./routes/index')(router);
var about = require('./routes/about')(router);
var app = express();
const https = require('https');
const fs = require('fs');
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// app.use(routes);
app.use(about);

app.get('/', function (req, res, next) {
    console.log("inside middleware...");
    next()
},
    function (req, res, next) {
        console.log("second middleware..");
        next();
    },
    function (req, res, next) {
        console.log("inside final function..");
        res.send("something");
    }
)

// const httpsOptions = {
//     key: fs.readFileSync('./openssl-0.9.8r-x64_86-win64-rev2/cert.key'),
//     cert: fs.readFileSync('./openssl-0.9.8r-x64_86-win64-rev2/cert.pem')
// }


// app.router

app.locals.points = "1.789"


app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//err handlers
//development error handlers
//will print stacktrace
console.log(app.get('env'))

if (app.get('env') === 'development') {
    console.log('development env')
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
} else {
    console.log('here...')
}
//production error handler
//no stacktrace leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    })
})




// const server = https.createServer(httpsOptions, app)
//     .listen(port, () => {
//         console.log('server running at ' + port)
//     })


app.listen(port, function () {
    console.log("port is on:3000")
});
module.exports = app;

