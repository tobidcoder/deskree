var mysql = require('mysql');

var conn = mysql.createConnection({
  host: '127.0.0.1', // Replace with your host name
  user: 'root',      // Replace with your database username
  password: 'root',      // Replace with your database password
  database: 'deskree', // // Replace with your database Name
  port: 8889 // Replace with your database
});


conn.connect(function (err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;