const express = require("express");
const mysql = require("mysql2");
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');


// apply middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

//Creates connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Owltime13!",
  database: "nodejsdemo",
});

db.connect( (err) => {
    if(err){
        throw err;
    }
    console.log('MySql connected...');
});


//get all user api
app.get("/api/listAllUsers", (req, res) => {
    const sqlInsert = "SELECT * FROM nodejsdemo.web_user;";
    db.query(sqlInsert, (req, result) => {
        res.send(result);
    });
});


app.listen(process.env.PORT || PORT, () => {
  console.log("Server started on port 3002");
});
