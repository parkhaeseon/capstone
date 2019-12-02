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

router.post('/manage', function(req, res) {

    var Left = req.body.Left;
    var Right = req.body.Right;
    var dict = {};
    dict['Talk Room 1'] = 1;
    dict['Talk Room 2'] = 2;
    dict['Talk Room 3'] = 3;
    dict['3D Printer'] = 4;
    dict['VR Room'] = 5;
    dict['Visual Studio'] = 6;
    dict['Work Place'] = 7;

    for(let i = 0; i<Left.length; i++) {
        const result = db.query(`update roommng set sit = 1 where roomnumber = ?`, 
        [dict[Left[i]]]);
    }
    
    for(let i = 0; i<Right.length; i++) {
        const result2 = db.query(`update roommng set sit = 0 where roomnumber = ?`, 
        [dict[Right[i]]]);
    }

    res.send('success');
});

router.post('/list', function(req, res) {
    const result3 = db.query(`select * from roommng`);
    res.send(result3);
});

module.exports = router;