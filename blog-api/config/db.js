const mongoose = require('mongoose')

async function dbConnect(){
  try{
    await mongoose.connect(process.env.MONGODB_URL)
     console.log("Database connect successfully")
  }
  catch(error){
    console.log("Something went wronng",error.message)
    process.exit(1)
  }
}
module.exports = dbConnect