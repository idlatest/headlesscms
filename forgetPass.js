const conn = require('./dbconnect')


const bcrypt = require("bcrypt")
const nodemailer = require('nodemailer')
const Joi = require('@hapi/joi')

const forgetP = async function (email, password) {

    const confirmEmail = `SELECT COUNT(*) AS cnt FROM users WHERE email = "${email}" LIMIT 1 `
       
    conn.query(confirmEmail, (error, result) => {
        console.log(result)
        if (result[0].cnt>0) {
            console.log(result)
            console.log('no user with email  exist')

        }
        else {

            const saltRound = 10;

            bcrypt.genSalt(saltRound, function (err, salt) {
                if (err) {
                    throw err
                } else {
                    bcrypt.hash(password, salt, function (err, hash) {
                        if (err) {
                            throw err
                        } else {
                            const passwordReset = `UPDATE users SET password = + "${hash}", WHERE email = + "${email}" `
                            console.log(token)
                            conn.query(passwordReset, (error, result) => {
                                if (error) {
                                    throw error
                                } else {


                                    console.log("password updated")
                                }
                            })
                        }

                    })
                }
            })
        }
    })
}

module.exports = forgetP;

