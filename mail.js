const crypto = require("crypto")
const conn = require('./dbconnect')
const nodemailer = require('nodemailer')

const sendMa = function (email) {

    // create a token n update it into db, n timestamp

    const token = crypto.randomBytes(20).toString('hex') //save to user table on token column
    timeStamp = Date.now() //save to user table on created_at colum

    const update = `UPDATE users SET created_at = ${timeStamp}, token = "${token}" WHERE email = "${email}"`
 
    conn.query(update, (error, result) => {
        if (error) {
            throw error
        } else {
            console.log("created_at and token updated")

            // if true send a mail
             const smtpTransporter = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "36641322885dff",
                    pass: "106c91f997a45e"
                }
            });

            const mailOptions = {
                to: "tomose374@gmail.com",
                from: 'tomose374@gmail.com',
                subject: 'password reset notification',
                text: 'Hello, \n\n' +
                    'please follow the below step to reset your password ',
                html: `<a href="http://localhost:8000/passwordreset"> enter the given link for password reset </a>`
            };
            smtpTransporter.sendMail(mailOptions, function (err, req) {

                if (err) {
                    console.log(err)
                } else {
                    console.log('mail sent successfully')
                }

            });
        }
    })

}

module.exports = sendMa;



