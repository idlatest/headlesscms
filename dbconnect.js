const mysql = require("mysql")

const connect = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "cmsdb"
})

connect.connect(function (error){
  if(error){
    throw error
  } else {
    console.log("connected")
  }
})

module.exports = connect
