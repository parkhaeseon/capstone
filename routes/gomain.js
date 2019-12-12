var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('../lib/db.js');
// var session = require('express-session');
// var FileStore = require('session-file-store')(session);
var app = express();

router.post('/', function(req, res) {
  var post = req.body;
  var result;
  
  if(post.classlevel == 1) {
    result = db.query(`select concat(left(reservationcode, 4), '년 ', substring(reservationcode, 5, 2), '월 ', substring(reservationcode, 7, 2), '일') as Date,
    concat(substring(reservationcode, 9, 2), ':00 ~ ', cast(substring(reservationcode, 9, 2) as signed) + 1, ':00') as Time,
    (case substring(reservationcode, 13, 1) 
    when '1' then 'Talk 1' 
    when '2' then 'Talk 2'
    when '3' then 'Talk 3'
    when '4' then '3D Printer Room'
    when '5' then 'VR Room'
    when '6' then 'Visual Studio'
    when '7' then 'Makers Workshop' 
    else null
    end)
    as Room,
    count(*) as Cnt,
    (select reason from reservation where reservationcode = r1.reservationcode) as Reason
    from reservationlist r1 group by reservationcode`);
  }
  else {
    result = db.query(`select concat(left(reservationcode, 4), '년 ', substring(reservationcode, 5, 2), '월 ', substring(reservationcode, 7, 2), '일') as Date,
        concat(substring(reservationcode, 9, 2), ':00 ~ ', cast(substring(reservationcode, 9, 2) as signed) + 1, ':00') as Time,
        (case substring(reservationcode, 13, 1) 
        when '1' then 'Talk 1' 
        when '2' then 'Talk 2'
        when '3' then 'Talk 3'
        when '4' then '3D Printer Room'
        when '5' then 'VR Room'
        when '6' then 'Visual Studio'
        when '7' then 'Makers Workshop' 
        else null
        end)
        as Room,
        (select count(*) from reservationlist r2 where r2.reservationcode = r1.reservationcode) as Cnt,
        (select reason from reservation where reservationcode = r1.reservationcode) as Reason
        from reservationlist r1 
        where id = ?
        group by reservationcode`, [post.id]);
  }

  var resinfo = {
    rec : result
}           

res.send(resinfo);
});

module.exports = router;