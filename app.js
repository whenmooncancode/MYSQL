console.log("hello guys!")
var mysql = require('mysql');
const { faker } = require('@faker-js/faker');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',     // your root username
  database : 'join_us'   // the name of your db
});
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
   if (error) throw error;
   console.log('The solution is: ', results[0].solution);
});
var data = [];
for(var i = 0; i < 500; i++){
    data.push([
        faker.internet.email(),
        faker.date.past()
    ]);
}
 
 
var q = 'INSERT INTO users (email, created_at) VALUES ?';
 
connection.query(q, [data], function(err, result) {
  console.log(err);
  console.log(result);
});
 
connection.end();