const express = require("express")
const mysql = require("mysql")
const bcrypt = require("bcrypt")
const user = require("./reg.js")
const app = express()

app.post('/register', (req,res)=>{
  const reg = user('tom@','mypass1234','admin',0.00,0.00)

  res.send("User registered successfully")

});

 

app.listen(8000, function () {
  console.log("listening on port 8000")
})

