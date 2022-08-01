const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

// apply middleware
app.use(bodyParser.urlencoded({ extended: false })); //was true
app.use(bodyParser.json());

app.use(cors());

const PORT = 3305;

//Creates connection
const db = mysql.createConnection({
  host: "us-cdbr-east-06.cleardb.net",
  user: "b5afa61b88c1ab",
  password: "1c788992",
  database: "heroku_43746ee8f304c3f",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql connected...");
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
app.get("/api/insertUserCheck", (req, res) => {

  const newUser = {
    email: 'insert@temple.edu',
    password: "insertPassword"
  }

  const sqlInsertUser = "INSERT INTO heroku_43746ee8f304c3f.web_user SET ?;";
  db.query(sqlInsertUser, newUser, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send("User Inserted")
  })
} )
app.post("/api/createUser", (req, res) => {
  const sqlCreate = ""
})


//Deleting Single User
app.get("/api/deleteUser/:id", (req, res) => {
  const sqlDelete = `DELETE FROM heroku_43746ee8f304c3f.web_user WHERE id=${req.params.id};`;
  db.query(sqlDelete, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`User ${req.params.id} Deleted... `);
  })
})


app.listen(process.env.PORT || PORT, () => {
  console.log(`Server started on port ${PORT} `);
});
