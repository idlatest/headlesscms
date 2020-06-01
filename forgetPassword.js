const conn = require('./dbconnect')
// const crypto = require('crypto')
// const bcrypt = require("bcrypt")
// const nodemailer = require('nodemailer')




const timeCompare = function (email, password) {

    const select = `SELECT created_at AS val FROM  users WHERE email = '${email}'`
    const newDate = Date.now() // cal the time diff btw db created_at nd newdate
    conn.query(select, (error, result) => {
        if (error) {
            throw error
        } else {
             res = result[0].val
        //   console.log(result)
            const difference = newDate - res
            //converting the diff of time in miliseconds to mins
            const timeRange = Math.floor((difference) / (60 * 1000))
            console.log(timeRange)

            if (timeRange <= 15) {
                // console.log("pls reset password before 10mins ")

                const passwordReset = `UPDATE users SET password = '${password}' WHERE email = '${email}'`
                conn.query(passwordReset, (error, result) => {
                    if (error) {

                        throw error
                    } else {
                         console.log("password updated or password hv be reset")
                    }
                })
            } else {
                console.log('time has expire you can not reset password')
            }
        }
    })
}
module.exports = timeCompare;









