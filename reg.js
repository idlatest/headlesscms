const bcrypt = require("bcrypt")
const conn = require("./dbconnect")


const userReg = function (email, password, role, delete_at, is_enable) {
    const select = `SELECT COUNT(*) AS cnt FROM users WHERE email = "${email}" LIMIT 1 `
    conn.query(select, (error, result) => {
        console.log('results', )
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
                        } else {
                            const insertUser = `INSERT INTO users(email,password,role,deleted_at, is_enabled) 
                                VALUES('${email}', '${hash}', '${role}', ${delete_at}, ${is_enable})`;
                            conn.query(insertUser, (error, result) => {
                                if (error) {
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
