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

function randNum(){
    var ALPHA = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9'];
    var rN='';

    for(var i=0; i<10; i++){
     var randTnum = Math.floor(Math.random()*ALPHA.length);
     rN += ALPHA[randTnum];
    }

    return rN;
}

router.post('/cancel', function(req, res){
    var post = req.body;
    var datestart = post.year + "-" + post.month + "-" + post.day + " 00:00:00";

    const result = db.query(`select p1.penaltycode from penaltylist p1
    inner join penalty p2
    using(penaltycode)
    where date_format(?, '%Y-%m-%d') between date_format(p2.datestart, '%Y-%m-%d') and date_format(p2.dateend,'%Y-%m-%d') and
    p1.id = ?`, [datestart, post.id]);

    if(result.length == 0) {
        res.send('fail');
        return;
    }

    for(let i =0; i<result.length; i++) {
        const result2 = db.query(`delete from penalty where penaltycode = ?`,[result[i].penaltycode]);
    }

    res.send('success');
});

router.post('/grant', function(req, res){
    var post = req.body;
    var datestart = post.year + "-" + post.month + "-" + post.day + " 00:00:00";

    const result = db.query(`select count(*) as cnt from penaltylist p1
    inner join penalty p2
    using(penaltycode)
    where date_format(?, '%Y-%m-%d') between date_format(p2.datestart, '%Y-%m-%d') and date_format(p2.dateend,'%Y-%m-%d') and
    p1.id = ?`, [datestart, post.id]);
    
    if(result[0].cnt >= 1) {
        res.send('already');
        return;
    }

    var pntnum = 0, pntterm = 0;

    if(post.penaltytype == '기물파손') 
    {
        pntnum = 1;
        pntterm = 14;
    }
    else if(post.penaltytype == '노쇼') 
    {
        pntnum = 2;
        pntterm = 14;
    }
    else { 
        pntnum = 3;
        pntterm = 7;
    }

    let pcode = randNum();

    const result2 = db.query(`insert into penalty values(?, ?, date_add(?, interval ? day), ?)`, 
    [pcode, datestart, datestart, pntterm, pntnum]);
    
    const result3 = db.query(`insert into penaltylist values(?, ?)`, 
    [post.id, pcode]);

    res.send('success');
});

router.post('/manage', function(req, res) {

    const result = db.query(`select 
    t2.classname as Class,
    t1.id as ID, 
    t1.name as Name,
    (select count(*) from penaltylist where id = t1.id) as PenaltyCnt,
    ifnull(t5.penaltyname, '없음') as 'PenaltyReason',
    ifnull(date_format(t4.datestart, '%Y년 %m월 %d일'), 'X') as 'rDs',
    ifnull(date_format(t4.dateend, '%Y년 %m월 %d일'), 'X') as 'rDe'
    from user t1
    inner join classtype t2
    using(classlevel)
    left join penaltylist t3
    on t3.id = t1.id
    left join penalty t4
    on t3.penaltycode = t4.penaltycode
    left join penaltytype t5
    on t4.penaltynumber = t5.penaltynumber
    where t1.classlevel != 1
    order by t1.classlevel`);

    res.send(result);
});

module.exports = router;