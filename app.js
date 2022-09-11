const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config();

// apply middleware
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 


//Creates connection
//create pool defaults to 10 connnections. Can change by specifying connectionLimit: #
const db = mysql.createPool({
  host: "us-cdbr-east-06.cleardb.net",
  user: "b5afa61b88c1ab",
  password: "1c788992",
  database: "heroku_43746ee8f304c3f",
});


//get all user api
app.get("/api/listAllUsers", (req, res) => {
  const sqlGet = "SELECT * FROM heroku_43746ee8f304c3f.web_user;";
  db.query(sqlGet, (req, result) => {
    res.send(result);
  });
});

app.get("/api/listAllPasswords", (req, res) => {
  const sqlPass = "SELECT password FROM heroku_43746ee8f304c3f.web_user;";
  db.query(sqlPass, (req, result) => {
    res.send(result);
  });
});

//get single user by id
app.get("/api/getUser/:id", (req, res) => {
  const sqlGetId = `SELECT * FROM heroku_43746ee8f304c3f.web_user WHERE id=${req.params.id};`;

  db.query(sqlGetId, (err, result) => {
    console.log(result);
    res.send(result);
  })
})


//Creating single user
app.post("/api/insertUserCheck", (req, res) => {

  const newUser = {
    email: 'insert3@temple.edu',
    password: "insert3Password"
  }

  const sqlInsertUser = "INSERT INTO heroku_43746ee8f304c3f.web_user SET ?;";
  db.query(sqlInsertUser, newUser, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send("User Inserted ")
  })
} )



//Deleting Single User
app.delete("/api/deleteUser/:id", (req, res) => {
  const sqlDelete = `DELETE FROM heroku_43746ee8f304c3f.web_user WHERE id=${req.params.id};`;
  db.query(sqlDelete, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`User ${req.params.id} Deleted...`);
  })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} `);
});
