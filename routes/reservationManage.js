var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('../lib/db.js');
// var session = require('express-session');
// var FileStore = require('session-file-store')(session);
var app = express();

// app.use(session({
//   secret: 'asdnoasd2#*d2s',
//   resave: false, 
//   saveUninitialized: true,
//   store:new FileStore()
// }))

router.post('/delete', function(req, res){
    var post = req.body;

    const dquery = db.query(`delete from reservation where reservationcode = ?`, [post.reservationcode]);
    
    const result = db.query(`select reservationcode, autonumber, reason
    from waitinglist 
    where reservationcode = ? 
    order by classlevel, autonumber 
    limit 1`, [post.reservationcode]);

    if(result.length == 0) {
        res.send('success');
        return;
    }

    var resc = result[0].reservationcode;
    var an = result[0].autonumber;
    var rea = result[0].reason;

    const result2 = db.query(`select 
    id,
    concat
    (
    substring(reservationcode, 1, 4), '-',
    substring(reservationcode, 5, 2), '-',
    substring(reservationcode, 7, 2), ' ',
    substring(reservationcode, 9, 2), ':',
    substring(reservationcode, 11, 2), ':00'
    ) as datestart,
    concat
    (
    substring(reservationcode, 1, 4), '-',
    substring(reservationcode, 5, 2), '-',
    substring(reservationcode, 7, 2), ' ',
    cast(substring(reservationcode, 9, 2) as signed) + 1, ':',
    substring(reservationcode, 11, 2), ':00'
    ) as dateend,
    roomnumber
    from waitinguser
    where reservationcode = ? and autonumber = ?`, [resc, an]);

    if(result2.length == 0) {
        res.send('success');
        return;
    }

    const result3 = db.query(`insert into reservation
    values(?, ?, ?, ?, ?)`,
    [resc, result2[0].datestart, result2[0].dateend, result2[0].roomnumber, rea]);

    for(let i = 0; i < result2.length; i++) {
        const result4 = db.query(`insert into reservationlist
        values(?, ?)`,
        [result2[i].id, resc]);
    }

    const delete_query = db.query(`delete from waitinglist
    where reservationcode = ? and autonumber = ?`,
    [resc, an]);

    const delete_query2 = db.query(`delete from waitinguser
    where reservationcode = ? and autonumber = ?`,
    [resc, an]);
    
    res.send('success');
});

module.exports = router;