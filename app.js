const express = require("express");
const mysql = require("mysql2");
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const PORT = 3306;

// apply middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

//Creates connection
const db = mysql.createConnection({
  host: "us-cdbr-east-06.cleardb.net",
  user: "b5afa61b88c1ab",
  password: "1c788992",
  database: "heroku_43746ee8f304c3f",
});

db.connect( (err) => {
    if(err){
        throw err;
    }
    console.log('MySql connected...');
});


//get all user api
app.get("/api/listAllUsers", (req, res) => {
    const sqlInsert = "SELECT * FROM heroku_43746ee8f304c3f.web_user;";
    db.query(sqlInsert, (req, result) => {
        res.send(result);
    });
});


app.listen(process.env.PORT || PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
