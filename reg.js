const bcrypt = require("bcrypt")
const conn = require("./dbconnect")
const crypto = require("crypto")


const userReg = function (email, password, role, is_enabled) {
    const select = `SELECT COUNT(*) AS cnt FROM users WHERE email = "${email}" LIMIT 1 `
    conn.query(select, (error, result) => {
        console.log('result')
        if (result[0].cnt > 0) {
            console.log('user with the email already exists')
        } else {
            const saltRound = 10;
           

            bcrypt.genSalt(saltRound, function (err, salt) {
                if (err) {
                    throw err
                } else {
                    bcrypt.hash(password, salt, function (err, hash) {
                        if (err) {
                            throw err
                        } else { // reg user
                            const token = crypto.randomBytes(20).toString('hex') //save to user table on token column
                            timeStamp = Date.now() //save to user table on created_at colum 

                            const insertUser = `INSERT INTO users(email,password,role,created_at, is_enabled,token) 
                                VALUES('${email}', '${hash}', '${role}',${timeStamp},${is_enabled},'${token}')`;
                            conn.query(insertUser, (error, result) => {
                                if (error) {
                                    console.log(error)
                                    console.log('error occured')
                                } else {
                                    console.log('new user registered')
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

module.exports = userReg;
// module.exports = emailConfirm;
