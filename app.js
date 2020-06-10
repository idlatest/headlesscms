const express = require("express")
const mysql = require("mysql")
const bcrypt = require("bcrypt")
const user = require("./reg.js")
const test = require("./mail")
const forgotPassword = require('./forgetPassword.js')
const app = express()
const bodyparser = require('body-parser');
const validator = require('./validation/validators')



//  const forget = require('./forgetPass')


app.use(bodyparser.urlencoded({ extended: true }));


app.post('/register', (req, res) => {

    //  validator(req, res)

    res.send("req validated")

     const reg = user(req.body.email, req.body.password, req.body.role, req.body.is_enabled)
    

});


app.post('/passwordreset', (req, res) => {

    forgotPassword(req.body.email,req.body.password)
    res.send('password updated')

    // const resetPassword = forgotPassword(req.body.email, req.body.password)
    var d = new Date()
    var timeObj = { hour: d.getHours(), minutes: d.getMinutes(), seconds: d.getSeconds() }
    console.log(`H: ${timeObj.hour} M: ${timeObj.minutes} S: ${timeObj.seconds}`)
    //res.send("passreset")

});

app.post('/mailrout', (req, res) => {
    test(req.body)
    res.status(200).json({
        db: 'db updated and  timeStamp created',
        mail: 'mail sent'

    })

})






app.listen(8000, function () {
    console.log("listening on port 8000")
})

