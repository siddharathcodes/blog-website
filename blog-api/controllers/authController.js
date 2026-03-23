const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const generateOTP = require('../utils/generateOTP')
const sendEmail = require('../utils/sendEmail')


const generateToken = (userid)=>{
return jwt.sign(
  {id:userid},
  process.env.JWT_SECRET,
  {
    expiresIn : '7d'
  }
)
}



//register

const register = async(req,res)=>{
try {
   const {name,password,email} = req.body
  if(!name || !password || !email){
     return res.status(400).json({
      message : 'All fields are required'
    })
  }

  const existingUser = await User.findOne({email})
  if(existingUser){
   return res.status(401).json({
      message : "Email Already Exist"
    })
  }

  const hashedPassword = await bcrypt.hash(password,10)

  const otp = generateOTP()
  const otpExpiry = new Date(Date.now() + 10*60*1000)

  await User.create({
    name,
    email,
    password:hashedPassword,
    otp,
    otpExpiry
  })
  await sendEmail(
    email,
    'this is for register',
    `your otp is ${otp}`
  )

  res.status(201).json({
    message :'Register Successfully'
  })
} catch (error) {
  res.status(500).json({message:error.message})
}
}

//verify 

const verifyEmail = async(req,res)=>{
try {
    const {email, otp} = req.body

  if(!email || !otp){
    return res.status(400).json({
      message :'All filed are required'
    })
  }

  const user = await User.findOne({email})
  if(!user){
    return res.status(400).json({
      message :"Please Enter a correct Email"
    })
  }

  if(user.otp !== otp){
    return res.status(400).json({
      message :'Otp is invalid'
    })
  }

  if(user.otpExpiry < new Date()){
    return res.status(400).json({
      message : 'otp is expired'
    })
  }

  const token = generateToken(user._id)
 
  user.isVerified = true
  user.otp = null
  user.otpExpiry=null
 await user.save()

 res.status(200).json({
  message :'email verified',
  token,
  user:{
    id:user.id,
    email:user.email,
    name:user.name,
    role:user.role,
  }
 })
  
} catch (error) {
  res.status(500).json({
    message : error.message
  })
}
}

//login
const login = async (req,res)=>{
try {
  const {email ,password} = req.body
  if (!email || !password) {
  return res.status(400).json({ message: 'All fields required' })
} 
const user = await User.findOne({email})
if(!user){
  return res.status(400).json({
    message :'Email not Found register First'
  })
}

if(!user.isVerified){
  return res.status(400).json({
    message :'Email is not verified'
  })
}

const isMatch = await bcrypt.compare(password,user.password)

if(!isMatch){
 return res.status(400).json({
    message : 'passowrd is incorrect '
  })
}
const token = generateToken(user._id)
res.status(200).json({
  message : 'login successful',
  token,
  user:{
    id:user.id,
    name:user.name,
    email:user.email,
    role:user.role
  }
})
} catch (error) {
  res.status(500).json({
    message :error.message
  })
}
}


// forget password

const forgotPassword = async (req,res)=>{
try {
  const {email} = req.body
  if (!email) {
    return res.status(400).json({
      message :'Field is required'
    })
  }
  
  const user = await User.findOne({email})
  if (!user) {
    return res.status(400).json({
      message : 'Email are not registered'
    })
  }

  const otp = generateOTP()
  const otpExpiry = new Date(Date.now() + 10*60*1000)

  user.otp = otp
  user.otpExpiry = otpExpiry
 await user.save()

 await sendEmail(
  email,
  'This otp is for forget password',
  `your otp is ${otp}`
 )
res.status(200).json({
  message:'otp sent in email please check'
})

} catch (error) {
  res.status(500).json({
    message: error.message
  })
}
}

//verify otp

const verifyOTP = async (req,res)=>{
 try {
   const {email,otp} = req.body
  if(!email || !otp){
    return res.status(400).json({
      message : 'All Filed are Required'
    })
  }
  const user = await User.findOne({email})
  if(!user){
    return res.status(400).json({
      message :"Email are Not found in database"
    })
  }

  if(user.otp !==otp){
    return res.status(400).json({
      message :"OTP is not valid"
    })
  }

  if(user.otpExpiry < new Date()){
    return res.status(400).json({
      message :'OTP is expired'
    })
  }

  user.otp = null
  user.otpExpiry = null
  await user.save()

  res.status(200).json({
    message : 'otp verify successfull'
  })

 } catch (error) {
  res.status(500).json({
    message :"OTP is not verified"
  })
 }
}



//reset passowrd

const resetPassword = async(req,res)=>{
try {
    const {email, newPassword} = req.body
  if(!email || !newPassword){
    return res.status(400).json({
      message : 'ALl filed are required'
    })
  }

  const user = await User.findOne({email})
  if(!user){
    return res.status(200).json({
      message : 'Email is invalid'
    })
  }

  const hashedPassword = await bcrypt.hash(newPassword,10)
  user.password = hashedPassword
   await user.save()

  res.status(200).json({
    message :"password reset successfull"
  })
} catch (error) {
  res.status(500).json({
    message : error.message
  })
}

}

const getMe = async(req,res)=>{
  try {
    
    res.status(200).json({
      user : req.user
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const logOut = async(req,res)=>{
  try {
    res.status(200).json({message :"logout sucessfully"})
  } catch (error) {
    res.status(500).json({
      message: error. message
    })
  }
}

module.exports = {
  register,
  verifyEmail,
  login,
  forgotPassword,
  verifyOTP,
  resetPassword,
  getMe,
  logOut
}