const express = require("express")
const mysql = require("mysql")
const bodyparser = require("body-parser")

const app = express()
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

const con = mysql.createConnection({
  use: "cmsdb",
  host: "localhost",
  user: "root",
  database: "cmsdb"
})

con.connect(function (error){
if(error){
  console.log(error)
}else {
console.log("connected")
}
})

const table1 = 'CREATE TABLE users(id INT AUTO_INCREMENT PRIMARY KEY,email VARCHAR(255),password INT(11),role ENUM("user","admin"),deleted_at TIMESTAMP,is_enabled TIMESTAMP)ENGINE=INNODB'

con.query(table1, function (error, result) {
  if (error) {
    console.log(error.message)
  } else
    console.log("table1 created")
})

const table2 = "CREATE TABLE project(id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, name VARCHAR(255), description TEXT, token VARCHAR(255), created_at TIMESTAMP, updated_at TIMESTAMP, FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE)ENGINE=INNODB"

con.query(table2, function (error, result) {
  if (error) {
    console.log(error.message)
  } else
    console.log("table2 created!")
})

const table3 = "CREATE TABLE post(id INT AUTO_INCREMENT PRIMARY KEY,user_id INT,project_id INT, title VARCHAR(100), body TEXT, published TIMESTAMP, created_at TIMESTAMP, updated_at TIMESTAMP, FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY(project_id) REFERENCES project(id) ON DELETE CASCADE)ENGINE=INNODB"

con.query(table3, function (error, result) {
  if (error) {
    console.log(error.message)
  } else {
    console.log("table3 created")
  }
})

app.listen(8000, function () {
  console.log("listening on port 8000")
})

