const express = require("express")
const mysql = require("mysql")
const bcrypt = require("bcrypt")
const user = require("./reg.js")
const app = express()
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({ extended: true }));


app.post('/register', (req,res)=>{
  
  
   const reg = user(req.body.email,req.body.password,req.body.role,req.body.deleted_at,req.body.is_enabled)

  res.send(reg) 

});

 

app.listen(8000, function () {
  console.log("listening on port 8000")
})

