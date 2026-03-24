const nodemailer = require('nodemailer')

const sendEmail = async (to,subject,text)=>{

   try{
     // connection to the gmail
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000
})

    // sender email to other
    const mailOption ={
        from :process.env.EMAIL_USER,
        to,
        subject,
        text
    }
    await transporter.sendMail(mailOption)
        console.log("Email sent to ", to)
   }

   catch(error){
    console.error("error sent ", error.message)
    throw new Error('Email could not be sent')
   }
}

module.exports = sendEmail