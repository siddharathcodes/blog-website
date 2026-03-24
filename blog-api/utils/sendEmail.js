const nodemailer = require('nodemailer')

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER, //brevo name
        pass: process.env.EMAIL_PASS, // your Brevo SMTP key
      },
    })

    const mailOption = {
      from: process.env.EMAIL_USER, // or verified sender email
      to,
      subject,
      text,
    }

    await transporter.sendMail(mailOption)
    console.log("Email sent to", to)

  } catch (error) {
    console.error("Error sending:", error.message)
    throw new Error('Email could not be sent')
  }
}

module.exports = sendEmail