var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('../lib/db.js');
// var session = require('express-session');
// var FileStore = require('session-file-store')(session);
var app = express();

// app.use(session({
//     secret: 'asdnoasd2#*d2s',
//     resave: false, 
//     saveUninitialized: true,
//     store:new FileStore()
// }))

router.post('/sum', function(req, res) {

    console.log('req.body = ', req.body);

    const result = db.query(`select u1.name, sum(date_format(r1.dateend, '%H') - date_format(r1.datestart, '%H')) as usetime from reservation r1
    left join reservationlist r2
    using(reservationcode)
    inner join user u1
    on u1.id = r2.id
    where u1.classlevel = 2 and
    date_format(r1.datestart, '%Y') = ? and
    date_format(r1.datestart, '%m') = ?
    group by u1.id`, [req.body.year, req.body.month]);

    res.send(result);
});

module.exports = router;