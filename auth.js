const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const connect = require('./dbconnect.js')

//VALIDATION
const Joi = require('@hapi/joi')

router.post('/login', async (req, res) => {

  const data = req.body;

  const schema = Joi.object().keys({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  })

  const { error } = schema.validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  //checking if the email exists
  connect.query("SELECT * FROM users WHERE email = ? LIMIT 1", [data.email], function (error, user) {
    if (error) {
      throw error
    }

    if (!user) {
      return res.status(400).send('Invalid credential')
    }

    
    

    // if (data.password != user.password) {
    //   return res.status(400).send("Invalid credential")
    // }

    bcrypt.compare(data.password, user[0].password)
      .then(validPass => {
        if (!validPass) {
          return res.status(400).send("Invalid credential")
        }
      }).catch(err => {})

    const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET)

    res.json({
      token: token
    })
  })
})


function auth(req, res, next) {
  const token = req.header('auth_token')
  if (!token) return res.status(401).send("Access denied")
}
try {
  const verified = jwt.verify(token, process.env.TOKEN_SECRET)
  req.user = verified;
} catch (err) {

}

module.exports = router;