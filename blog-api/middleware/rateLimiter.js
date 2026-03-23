const rateLimit = require('express-rate-limit')

const loginLimiter = rateLimit({
    windowMs: 15*60*1000,
    max:5,
    message:{
        message :'too many login attempts !try after 15 minutes'
    }
})
const registerLimiter = rateLimit({
    windowMs: 60*60*1000,
    max:10,
    message:{
        message :'too many registration !try after 1 hour'
    }
})
const otpLimiter = rateLimit({
    windowMs: 10*60*1000,
    max:3,
    message:{
        message :'too many otp attempts !try after 10 minutes'
    }
})

module.exports ={
    loginLimiter,registerLimiter,otpLimiter
}