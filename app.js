const express = require("express")
<<<<<<< HEAD
const mysql = require("mysql")
const bcrypt = require("bcrypt")
const user = require("./reg.js")
const test = require("./mail")
const forgotPassword = require('./forgetPassword.js')
const app = express()
const bodyparser = require('body-parser');
const validator = require('./validation/validators')



//  const forget = require('./forgetPass')


app.use(bodyparser.urlencoded({ extended: true }));


app.post('/register', (req, res) => {

    //  validator(req, res)

    res.send("req validated")

     const reg = user(req.body.email, req.body.password, req.body.role, req.body.is_enabled)
    

});


app.post('/passwordreset', (req, res) => {

    forgotPassword(req.body.email,req.body.password)
    res.send('password updated')

    // const resetPassword = forgotPassword(req.body.email, req.body.password)
    var d = new Date()
    var timeObj = { hour: d.getHours(), minutes: d.getMinutes(), seconds: d.getSeconds() }
    console.log(`H: ${timeObj.hour} M: ${timeObj.minutes} S: ${timeObj.seconds}`)
    //res.send("passreset")

});

app.post('/mailrout', (req, res) => {
    test(req.body)
    res.status(200).json({
        db: 'db updated and  timeStamp created',
        mail: 'mail sent'

    })

})






app.listen(8000, function () {
    console.log("listening on port 8000")
=======
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

const connect = require('./dbconnect.js')
const authRoute = require('./auth.js')

const app = express()

dotenv.config()

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

app.use('/api/user', authRoute)
  

  const table1 = 'CREATE TABLE IF NOT EXISTS users(id INT AUTO_INCREMENT PRIMARY KEY,email VARCHAR(255),password VARCHAR(50),role ENUM("user","admin"),deleted_at TIMESTAMP,is_enabled TIMESTAMP)ENGINE=INNODB'

connect.query(table1, function (error, result) {
  if (error) {
    console.log(error.message)
  } else
    console.log("table1 created")
})

const sql1 = "INSERT INTO users(id,email,password,role,deleted_at, is_enabled) VALUES(NULL, 'mike@gmail.com', 'mike07', 'user', 0.00, 0.00)"

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
>>>>>>> upstream/master
})

