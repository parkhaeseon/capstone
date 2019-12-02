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

router.post('/restable', function(req, res){
    var post = req.body;

    const result = db.query(`select distinct r2.reservationcode, date_format(datestart, '%H') as Time, roomnumber as Room, u1.classlevel from reservation r1
    inner join reservationlist r2
    using(reservationcode)
    inner join user u1
    on u1.id = r2.id
    where date_format(datestart, '%Y%m%d') = ?
    order by date_format(datestart, '%H'), roomnumber`, [post.ymd]);

    const result2 = db.query(`select * from roommng`);

    res.send({result, result2});
});

router.post('/manage', function(req, res){
    var post = req.body;

    if(post.classlevel == 1){
        const result = db.query(`select reservationcode, concat(left(reservationcode, 4), '년 ', substring(reservationcode, 5, 2), '월 ', substring(reservationcode, 7, 2), '일') as Date,
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
        res.send(result);
    }
    else {
        const result2 = db.query(`select reservationcode, concat(left(reservationcode, 4), '년 ', substring(reservationcode, 5, 2), '월 ', substring(reservationcode, 7, 2), '일') as Date,
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
        res.send(result2);
    }
});

// https://www.npmjs.com/package/sync-mysql

router.post('/', function(req, res) {
    var post = req.body;
    
    // 학생이면
    if(post.classlevel === 4) {

        const result = db.query(`select count(*) as cnt from user where id in(?, ?, ?, ?)`, 
        [post.s1, post.s2, post.s3, post.s4]);

        // 학생일 때는 대표자 제외하고 모두 4명이므로, 4가 되어야한다. 여기서는 user에 id가 있는지 확인
        if(result[0].cnt == 4)
        {
            for(var i = 0; i<post.reservationcode.length; i++) 
            {
                var prc = post.reservationcode[i];
                var pds = post.datestart[i];
                var pde = post.dateend[i];


                const ispenalty = db.query(`
                select count(*) as cnt from penalty p1
                inner join penaltylist p2
                using(penaltycode)
                where p2.id in(?, ?, ?, ?, ?)
                and date_format(now(), '%Y%m%d') 
                between date_format(p1.datestart, '%Y%m%d') 
                and 
                date_format(p1.dateend, '%Y%m%d')`, 
                [post.presentid, post.s1, post.s2, post.s3, post.s4]);

                if(ispenalty[0].cnt >= 1) {
                    res.send('reservationpenalty');
                    return;
                }

                var rcode = prc;
                rcode = rcode.substring(0, rcode.length - 1);  
                rcode += '%';

                const result2 = db.query(`select count(*) as cnt from reservationlist 
                where reservationcode like ? and id in(?, ?, ?, ?, ?)`,
                [rcode, post.presentid, post.s1, post.s2, post.s3, post.s4]);

                // 해당 시간대에 이미 예약한 사람들이 있다면 already
                if(result2[0].cnt != 0) {
                    res.send('already')
                    return;
                }

                var dQuery1 = db.query(`delete from reservation where reservationcode = ?`, [prc]);

                const result3 = db.query(`insert into reservation values(?, ?, ?, ?, ?)`,
                [prc, pds, pde, post.roomnumber, post.reason]);

                const result4 = db.query(
                    `insert into reservationlist values(?, ?),(?, ?),(?, ?),(?, ?),(?, ?)`, 
                [post.presentid, prc, 
                    post.s1, prc, 
                    post.s2, prc,
                    post.s3, prc,
                    post.s4, prc]);

                res.send('success');
            }       
        }
        else // user table에 4명이 아닐 경우
        {
            res.send('countError')
        }
    }
    else // 기업 교수 관리자일 때
    {
        for(var i = 0; i<post.reservationcode.length; i++) 
        {
            var prc = post.reservationcode[i];
            var pds = post.datestart[i];
            var pde = post.dateend[i];

            var rcode2 = prc;
            rcode2 = rcode2.substring(0, rcode2.length - 1);  
            rcode2 += '%';

            const result5 = db.query(`select count(*) as cnt from reservationlist 
            where reservationcode like ? and id = ?`, [rcode2, post.presentid]);

            // 해당 시간대에 이미 대표자가 예약이 되어있다면, already
            if(result5[0].cnt != 0) {
                res.send('already')
                return;
            }

            var dQuery2 = db.query(`delete from reservation where reservationcode = ?`, [prc]);

            const result6 = db.query(`insert into reservation values(?, ?, ?, ?, ?)`,
            [prc, pds, pde, post.roomnumber, post.reason]);


            const result7 = db.query(`insert into reservationlist values(?, ?)`, 
            [post.presentid, prc]);

            res.send('success');
        }       
    }
});

router.post('/wait', function(req, res) {
    var post = req.body;
    
    // 학생이면
    if(post.classlevel === 4) {

        const result = db.query(`select count(*) as cnt from user where id in(?, ?, ?, ?)`, 
        [post.s1, post.s2, post.s3, post.s4]);

        // 학생일 때는 대표자 제외하고 모두 4명이므로, 4가 되어야한다. 여기서는 user에 id가 있는지 확인
        if(result[0].cnt == 4)
        {
            for(var i = 0; i<post.reservationcode.length; i++) 
            {
                var prc = post.reservationcode[i];
                var pds = post.datestart[i];
                var pde = post.dateend[i];


                const ispenalty = db.query(`
                select count(*) as cnt from penalty p1
                inner join penaltylist p2
                using(penaltycode)
                where p2.id in(?, ?, ?, ?, ?)
                and date_format(now(), '%Y%m%d') 
                between date_format(p1.datestart, '%Y%m%d') 
                and 
                date_format(p1.dateend, '%Y%m%d')`, 
                [post.presentid, post.s1, post.s2, post.s3, post.s4]);

                if(ispenalty[0].cnt >= 1) {
                    res.send('reservationpenalty');
                    return;
                }

                var rcode = prc;
                rcode = rcode.substring(0, rcode.length - 1);  
                rcode += '%';

                const result2 = db.query(`select count(*) as cnt from reservationlist 
                where reservationcode like ? and id in(?, ?, ?, ?, ?)`,
                [rcode, post.presentid, post.s1, post.s2, post.s3, post.s4]);

                // 해당 시간대에 이미 예약한 사람들이 있다면 already
                if(result2[0].cnt != 0) {
                    res.send('already')
                    return;
                }

                var result3 = db.query(`select count(*) as cnt from waitinguser 
                where reservationcode like ? and id in(?, ?, ?, ?, ?)`,
                [rcode, post.presentid, post.s1, post.s2, post.s3, post.s4]);

                // 해당 시간대에 이미 대기 중인 사람들이 있다면 alreadywait
                if(result3[0].cnt > 0) {
                    res.send('alreadywait')
                    return;
                }

                var wQuery1 = db.query(`insert into 
                waitinglist(roomnumber, reservationcode, datestart, reason, classlevel) 
                values(?, ?, ?, ?, ?)`,
                [post.roomnumber, prc, pds, post.reason, post.classlevel]);

                var wQuery2 = db.query(`insert into waitinguser values
                (?, ?, last_insert_id(), ?),
                (?, ?, last_insert_id(), ?),
                (?, ?, last_insert_id(), ?),
                (?, ?, last_insert_id(), ?),
                (?, ?, last_insert_id(), ?)`,
                [
                    post.presentid, prc, post.roomnumber, 
                    post.s1, prc, post.roomnumber, 
                    post.s2, prc, post.roomnumber, 
                    post.s3, prc, post.roomnumber, 
                    post.s4, prc, post.roomnumber, ]);

                res.send('success');
            }       
        }
        else // user table에 4명이 아닐 경우
        {
            res.send('countError')
        }
    }
    else // 기업 교수 관리자일 때
    {
        for(var i = 0; i<post.reservationcode.length; i++) 
        {
            var prc = post.reservationcode[i];
            var pds = post.datestart[i];
            var pde = post.dateend[i];

            var rcode2 = prc;
            rcode2 = rcode2.substring(0, rcode2.length - 1);  
            rcode2 += '%';

            const result5 = db.query(`select count(*) as cnt from reservationlist 
            where reservationcode like ? and id = ?`, [rcode2, post.presentid]);

            // 해당 시간대에 이미 대표자가 예약이 되어있다면, already
            if(result5[0].cnt != 0) {
                res.send('already')
                return;
            }
         
            const result6 = db.query(`select count(*) as cnt from waitinguser 
            where reservationcode like ? and id = ?`, [rcode2, post.presentid]);

            // 해당 시간대에 이미 대표자가 예약 대기 중이라면 되어있다면, alreadywait
            if(result6[0].cnt > 0) {
                res.send('alreadywait')
                return;
            }

            var wQuery1 = db.query(`insert into 
                waitinglist(roomnumber, reservationcode, datestart, reason, classlevel) 
                values(?, ?, ?, ?, ?)`,
                [post.roomnumber, prc, pds, post.reason, post.classlevel]);

            var wQuery2 = db.query(`insert into waitinguser values (?, ?, last_insert_id(), ?)`,
            [post.presentid, prc, post.roomnumber]);

            res.send('success');
        }       
    }
});

module.exports = router;