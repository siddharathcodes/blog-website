const express = require('express')
const { loginLimiter, registerLimiter, otpLimiter } = require('../middleware/rateLimiter')
const { validateLogin, validateRegister } = require('../middleware/validate')
const router = express.Router()
const {
    register,
    verifyEmail,
    login,
    forgotPassword,
    verifyOTP,
    resetPassword,
    getMe,
    logOut
} = require('../controllers/authController')

const protect = require('../middleware/authMiddleware')

router.post('/register',registerLimiter,validateRegister,register)
router.post('/verify-email',otpLimiter,verifyEmail)
router.post('/login',loginLimiter,validateLogin, login)
router.post('/forgot-password',forgotPassword)
router.post('/verify-otp',otpLimiter, verifyOTP)
router.post('/reset-password',resetPassword)


router.get('/me',protect, getMe)
router.post('/logout',protect, logOut)

module.exports = router