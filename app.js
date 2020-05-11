const express = require("express")
const mysql = require("mysql")

const app = express()


const con = mysql.createConnection({
  host: "localhost",
  user: "root"
})

con.connect(function (error){
  if(error){
    console.log(error)
  }else {
  console.log("connected")
  }
  })

const connect = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "cmsdb"
  })

  connect.query("CREATE DATABASE IF NOT EXISTS cmsdb", function(error){
    if(error) {
      console.log(error.message)
    }
    console.log("database created!")
  })

  const table1 = 'CREATE TABLE IF NOT EXISTS users(id INT AUTO_INCREMENT PRIMARY KEY,email VARCHAR(255),password VARCHAR(50),role ENUM("user","admin"),deleted_at TIMESTAMP,is_enabled TIMESTAMP)ENGINE=INNODB'

connect.query(table1, function (error, result) {
  if (error) {
    console.log(error.message)
  } else
    console.log("table1 created")
})

const sql1 = "INSERT INTO users(id,email,password,role,deleted_at, is_enabled) VALUES(NULL, 'lucy@gmail.com', 'dgu5vjhfuiy', 'user', 0.00, 0.00)"

connect.query(sql1, function(error, result){
  if(error) {
    console.log(error)
  }
  console.log("inserted number of rows in table1:" + result.affectedRows)
})

const table2 = "CREATE TABLE IF NOT EXISTS project(id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, name VARCHAR(255), description TEXT, token VARCHAR(255), created_at TIMESTAMP, updated_at TIMESTAMP, FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE)ENGINE=INNODB"

connect.query(table2, function (error, result) {
  if (error) {
    console.log(error.message)
  } else
    console.log("table2 created!")
})

const sql2 = "INSERT INTO project(id,user_id,name,description,token,created_at,updated_at) VALUES(NULL, 1, 'mike', 'hdskuhfdbjkds', 'favfhdje56', 0.00,0.00)"

connect.query(sql2, function(error,result){
  if(error) {
    console.log(error)
  }
  console.log("inserted number of rows in table2:" + result.affectedRows)
})

const table3 = "CREATE TABLE IF NOT EXISTS post(id INT AUTO_INCREMENT PRIMARY KEY,user_id INT,project_id INT, title VARCHAR(100), body TEXT, published TIMESTAMP, created_at TIMESTAMP, updated_at TIMESTAMP, FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY(project_id) REFERENCES project(id) ON DELETE CASCADE)ENGINE=INNODB"

connect.query(table3, function (error, result) {
  if (error) {
    console.log(error.message)
  } else {
    console.log("table3 created")
  }
})

const sql3 = "INSERT INTO post(id,user_id,project_id,title,body,published,created_at,updated_at) VALUES(NULL,1, 1, 'headlesscms', 'cdhgsjkhlkjl',0.00, 0.00,0.00)"

connect.query(sql3, function(error,result){
  if(error) {
    console.log(error)
  }
  console.log("inserted number of rows in table3:" + result.affectedRows)
})

app.listen(8000, function () {
  console.log("listening on port 8000")
})

