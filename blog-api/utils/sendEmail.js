const axios = require("axios")

const sendEmail = async (to, subject, text) => {
  try {
    await axios.post("https://api.brevo.com/v3/smtp/email", {
      sender: {
        name: "Vetrix",
        email: process.env.EMAIL, // must be verified in Brevo
      },
      to: [{ email: to }],
      subject: subject,
      textContent: text,
    }, {
      headers: {
        "api-key": process.env.EMAIL_PASS, // your Brevo API key
        "Content-Type": "application/json",
      },
    })

    console.log("Email sent to", to)

  } catch (error) {
    console.error("Error sending:", error.response?.data || error.message)
    throw new Error("Email could not be sent")
  }
}

module.exports = sendEmail