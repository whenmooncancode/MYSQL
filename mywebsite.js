var express =require('express');
var app = express();
var mysql = require('mysql');
var bodyparser = require("body-parser");
app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',     // your root username
  database : 'join_us'   // the name of your db
});
app.get("/", function(req, res){
  var q = "SELECT COUNT(*) AS count FROM users";
  connection.query(q,function(error,results){
	  if (error) throw error;
	  var count = results[0].count;
	  //res.send("We Have " + results[0].count + " in the DB!");  
	  res.render("home",{data:count});
  });
 console.log("reached!");
});
app.post("/register",function(req,res){
	var question = 'INSERT INTO users SET ?';
	var person = {
		email: req.body.email
	};
connection.query(question,person, function(err, result){
 if (err) throw err;
 console.log(result);
 res.redirect("/");
});
});
app.get("/joke",function(req,res){
	var joke = "How do you call a dead almond? A diamond hahaha.";
	res.send(joke);
	console.log("joke reached!");
});
app.get("/rand_num", function(req, res){
	var num = Math.floor(Math.random() * 10) + 1 ;
 res.send("your lucky number is " + num);
 console.log("random reached!");
});
app.listen(3000,function(){
 console.log('App listening on port 3000!');
});