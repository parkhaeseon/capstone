var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./lib/db.js');
// var session = require('express-session');
// var FileStore = require('session-file-store')(session);
var signinRouter = require('./routes/signin.js');
var reservationDoRouter = require('./routes/reservationDo.js');
var penaltyMng = require('./routes/penaltyManage.js');
var companysumRouter = require('./routes/companysum.js');
var roomManage = require('./routes/roomManage.js');
var resManage = require('./routes/reservationManage.js');

var app = express();

app.set('port', process.env.PORT || 5000);

// app.use(session({
//     secret: 'asdnoasd2#*d2s',
//     resave: false, 
//     saveUninitialized: true,
//     store:new FileStore()
// }))

app.use(require('cors')());
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/signin', signinRouter); // 로그인
app.use('/reservationDo', reservationDoRouter); // 예약하기
app.use('/penalty', penaltyMng);
app.use('/company', companysumRouter);
app.use('/room', roomManage);
app.use('/reservationmanage', resManage);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});