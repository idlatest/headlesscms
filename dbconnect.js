
const mysql = require("mysql")

const con = mysql.createConnection({
    host: "localhost",
    user: "root"
})

con.connect(function (error) {
    if (error) {
        console.log(error)
    } else {
        console.log("connected")
    }
})

const connect = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "cmsdb"
})

module.exports = connect;