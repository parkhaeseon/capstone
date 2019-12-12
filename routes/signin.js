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

router.post('/out', function(req, res) { 
    res.send('success');
});

router.post('/', function(req, res) {
  var post = req.body;
  const result = db.query(`select * from user where id = ? and password = ?`, 
  [post.email, post.password]);
  
  if(result.length == 1) 
  {
    const result2 = db.query(`select date_format(datestart, '%Y년 %m월 %d일') as dates, 
    date_format(dateend, '%Y년 %m월 %d일') as datee from penalty p1
    inner join penaltylist p2
    using(penaltycode)
    where p2.id = ?
    and date_format(now(), '%Y%m%d') 
    between date_format(p1.datestart, '%Y%m%d') 
    and 
    date_format(p1.dateend, '%Y%m%d')`, [post.email]);

    // 해당 아이디가 현재 제재 중이라면
    if(result2.length >= 1) {
        res.send({ word : 'loginpenalty', dbs : result2});
        return;
    }

    var result3;

    if(result[0].classlevel == 1) {
        result3 = db.query(`select concat(left(reservationcode, 4), '년 ', substring(reservationcode, 5, 2), '월 ', substring(reservationcode, 7, 2), '일') as Date,
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
        result3 = db.query(`select concat(left(reservationcode, 4), '년 ', substring(reservationcode, 5, 2), '월 ', substring(reservationcode, 7, 2), '일') as Date,
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
        group by reservationcode`, [post.email]);
    }

    // req.session.is_logined = true;
    // req.session.ID = result[0].id;
    // req.session.classlevel = result[0].classlevel; // 클래스 레벨
    // req.session.name = result[0].name;
    // req.session.save(function(){}); 
    var resinfo = {
        is_logined : true,
        ID : result[0].id,
        classlevel : result[0].classlevel,
        name : result[0].name,
        rec : result3
    }           
    
    res.send(resinfo);
  }
  else res.send('Failure');
});

module.exports = router;