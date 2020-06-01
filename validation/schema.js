const Joi = require('@hapi/joi')


    
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })

module.exports = schema;