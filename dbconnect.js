
const mysql = require("mysql")


function RunQuery(query) {
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

    connect.query(query, (error,result) => {
        if(error){
            console.log(error)
        } else {
            console.log("success ")
        }
    })
}

module.exports = RunQuery;