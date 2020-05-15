const bcrypt = require("bcrypt")
const runQ = require("./dbconnect")


const userReg = function (email, password, role, delete_at, is_enable) {
    const saltRound = 10;

    bcrypt.genSalt(saltRound, function (err, salt) {
        if (err) {
            throw err;
        } else {
            bcrypt.hash(password, salt, function (err, hash) {
                if (err) {
                    throw err
                } else {
                    const insertUser = `INSERT INTO users(id,email,password,role,deleted_at, is_enabled) 
                        VALUES(NULL,'${email}', '${hash}', '${role}', ${delete_at}, ${is_enable})`;
                    runQ(insertUser)
                }
            })
        }
    })
}
module.exports = userReg; 
