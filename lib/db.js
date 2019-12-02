// var mysql = require('mysql');

// var db = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : '0000',
//     database : 'cap'
//   });

//   db.connect(function(error) {
//       if(error) {
//           console.log(error);
//           return;
//       }
//       else {
//           console.log('success!!');
//       }
//   });

//   module.exports = db;

var mysql = require('sync-mysql');

var db = new mysql({
    host     : 'localhost',
    user     : 'root',
    password : '0000',
    database : 'cap'
});

module.exports = db;